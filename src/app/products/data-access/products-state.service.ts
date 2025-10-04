import { Injectable, inject } from "@angular/core";
import { Product } from "../../shared/interfaces/product.interface";
import { signalSlice } from "ngxtension/signal-slice";
import { ProductsService } from "./products.service";
import { catchError, map, of, startWith, Subject, switchMap, combineLatest, Observable  } from "rxjs";
import { LIMIT } from "./products.service";

interface State {
    products: Product[];
    status: 'loading' | 'error' | 'success';
    page: number;
    selectedCategory: string | null;
    hasMoreProducts: boolean; 
    searchQuery: string | null;
}

@Injectable()
export class ProductsStateService {
    private productsService = inject(ProductsService);
    
    private initialState: State = {
        products: [],
        status: 'loading' as const,
        page: 1,
        selectedCategory: null,
        hasMoreProducts: true, 
        searchQuery: null
    };

//eventos de paginación y categoría
    private page$ = new Subject<number>();
    private category$ = new Subject<string | null>();
    private search$ = new Subject<string | null>();
// Combina los parámetros para recargar los productos cuando cambien
     private params$ = combineLatest([
        this.page$.pipe(startWith(1)),
        this.category$.pipe(startWith(null as string | null)),
         this.search$.pipe(startWith(null as string | null)) 
    ]);

//carga los productos desde la API
      private loadProducts$ = this.params$.pipe(
        switchMap(([page, category, search]) => { // MODIFICADO: ahora recibe 'search'
            // --- LÓGICA DE BÚSQUEDA ---
            if (search) {
                return this.productsService.getProducts(1, undefined, search).pipe(
                    map(filteredProducts => ({
                        products: filteredProducts,
                        status: 'success' as const,
                        hasMoreProducts: false, // No hay paginación en la búsqueda
                    })),
                    catchError(() => of({ status: 'error' as const, products: [], hasMoreProducts: false }))
                );
            }

            return this.productsService.getProducts(page, category).pipe(
                map((allProducts) => {
                    const hasMore = category ? false : allProducts.length === page * LIMIT;
                    const startIndex = (page - 1) * LIMIT;
                    const pageProducts = allProducts.slice(startIndex);
                    return { 
                        products: pageProducts, 
                        status: 'success' as const, 
                        hasMoreProducts: hasMore 
                    };
                }),
                catchError(() => of({ status: 'error' as const, products: [], hasMoreProducts: false }))
            );
        })
    );

    state = signalSlice({
        initialState: this.initialState,
        sources: [
            this.loadProducts$, // Fuente principal de datos
        ],
        actionSources: {
            // Acción para ir a la página siguiente
            nextPage: (state, action$: Observable<void>) =>
                action$.pipe(
                    map(() => {
                        const newPage = state().page + 1;
                        this.page$.next(newPage);
                        return { page: newPage, status: 'loading' as const };
                    })
                ),
            // Acción para ir a la página anterior
            previousPage: (state, action$: Observable<void>) =>
                action$.pipe(
                    map(() => {
                        const newPage = state().page - 1;
                        this.page$.next(newPage);
                        return { page: newPage, status: 'loading' as const };
                    })
                ),
            // filtra por categoría
            filterByCategory: (_state, action$: Observable<string | null>) =>
                action$.pipe(
                    map((category) => {
                        this.page$.next(1); // Resetea el stream de página a 1
                        this.category$.next(category); // Dispara el filtro de categoría
                        this.search$.next(null);
                        return {
                            selectedCategory: category,
                            page: 1, // Actualiza el estado de la página a 1
                            status: 'loading' as const,
                        };
                    })
                ),
        search: (_state, action$: Observable<string>) => action$.pipe(
                map((query) => {
                    this.page$.next(1); // Resetea la página
                    this.category$.next(null); // Limpia la categoría
                    this.search$.next(query); // Dispara la búsqueda
                    return {
                        searchQuery: query,
                        page: 1,
                        selectedCategory: null,
                        status: 'loading' as const
                    };
                })
            )
        }
    });
}