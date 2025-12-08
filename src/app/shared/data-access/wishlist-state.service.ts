import { Injectable, inject } from "@angular/core";
import { Product } from "../interfaces/product.interface"; 
import { signalSlice } from "ngxtension/signal-slice";
import { map, Observable } from "rxjs";
import { StorageService } from "./storage.service";

interface WishlistState {
    products: Product[];
    loaded: boolean;
}

@Injectable({ providedIn: 'root' })
export class WishlistStateService {

    private _storageService = inject(StorageService);
    private initialState: WishlistState = {
        products: [],
        loaded: false,
    };
    private loadWishlist$ = this._storageService.loadWishlist().pipe(
        map((products) => ({ products, loaded: true }))
    );

    state = signalSlice({
        initialState: this.initialState,
        sources: [this.loadWishlist$], 
        actionSources: {
            // Acción para añadir o eliminar un producto de la lista de deseos
            toggle: (state, action$: Observable<Product>) => action$.pipe(
                map((product) => {
                    const exists = state().products.some(p => p.id === product.id);
                    if (exists) {
                        return { products: state().products.filter(p => p.id !== product.id) };
                    }
                    return { products: [...state().products, product] };
                })
            ),
            // eliminar
            remove: (state, action$: Observable<number>) => action$.pipe(
                map((id) => ({ products: state().products.filter(p => p.id !== id) }))
            ),
            // prioridad
            move: (state, action$: Observable<{ index: number; direction: 'up' | 'down' }>) => action$.pipe(
                map(({ index, direction }) => {
                    const products = [...state().products];
                    const targetIndex = direction === 'up' ? index - 1 : index + 1;

                  
                    if (targetIndex < 0 || targetIndex >= products.length) return { products };

                    
                    [products[index], products[targetIndex]] = [products[targetIndex], products[index]];
                    return { products };
                })
            )
        },
    effects: (state) => ({
            load: () => {
                if (state().loaded) {
                    this._storageService.saveWishlist(state().products);
                }
            }
        })
    });

    inWishlist(id: number) {
        return this.state.products().some(p => p.id === id);
    }
}