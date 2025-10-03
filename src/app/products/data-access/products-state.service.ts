import { Injectable, inject } from "@angular/core";
import { Product } from "../../shared/interfaces/product.interface";
import { signalSlice } from "ngxtension/signal-slice";
import { ProductsService } from "./products.service";
import { catchError, map, of, startWith, Subject, switchMap, combineLatest, Observable } from "rxjs";

interface State {
    products: Product[];
    status: 'loading' | 'error' | 'success';
    page: number;
        selectedCategory: string | null;

}

@Injectable()
export class ProductsStateService {
    private productsService = inject(ProductsService);
    private initialState: State = {
        products: [],
        status: 'loading' as const,
        page:1,
        selectedCategory: null,
    };

    nextPage$ = new Subject<number>();
    previousPage$ = new Subject<number>();
    category$ = new Subject<string | null>();

    private params$ = combineLatest([
        this.nextPage$.pipe(startWith(1)),
        this.category$.pipe(startWith(null as string | null)),
    ]);

     private loadProducts$ = this.params$.pipe(
        switchMap(([page, category]) => 
            this.productsService.getProducts(page, category).pipe(
                map((products) => ({ products, status: 'success' as const })),
                catchError(() => of({ status: 'error' as const, products: [] }))
            )
        )
    );

    state = signalSlice({
        initialState: this.initialState,
        sources: [
            this.nextPage$.pipe(map((page) => ({ page, status: 'loading' as const }))),
            this.loadProducts$,
        ],
        actionSources: {
            filterByCategory: (_state, action$: Observable<string | null>) =>
                action$.pipe(
                    map((category) => {
                        // Dispara el subject para recargar los productos.
                        this.category$.next(category);
                        // Retorna el cambio de estado síncrono.
                        return {
                            selectedCategory: category,
                            page: 1, // Resetea la página.
                            status: 'loading' as const,
                        };
                    })
                ),
        }
    });
}

