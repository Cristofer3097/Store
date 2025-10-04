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
    };
//eventos de paginación y categoría
    private page$ = new Subject<number>();
    private category$ = new Subject<string | null>();
// Combina los parámetros para recargar los productos cuando cambien
     private params$ = combineLatest([
        this.page$.pipe(startWith(1)),
        this.category$.pipe(startWith(null as string | null)),
    ]);
//carga los productos desde la API
      private loadProducts$ = this.params$.pipe(
        switchMap(([page, category]) => 
            this.productsService.getProducts(page, category).pipe(
                map((allProducts) => {
                    // 1. Verificamos si hay más productos basándonos en la lista completa
                    const hasMore = category ? false : allProducts.length === page * LIMIT;

                    // 2. Calculamos desde dónde empezar a "recortar" la lista
                    const startIndex = (page - 1) * LIMIT;
                    
                    // 3. Obtenemos solo los productos para la página actual
                    const pageProducts = allProducts.slice(startIndex);

                    // 4. Retornamos el estado actualizado con los productos correctos
                    return { 
                        products: pageProducts, 
                        status: 'success' as const, 
                        hasMoreProducts: hasMore 
                    };
                }),
                catchError(() => of({ status: 'error' as const, products: [], hasMoreProducts: false }))
            )
        )
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
                        return {
                            selectedCategory: category,
                            page: 1, // Actualiza el estado de la página a 1
                            status: 'loading' as const,
                        };
                    })
                ),
        }
    });
}

