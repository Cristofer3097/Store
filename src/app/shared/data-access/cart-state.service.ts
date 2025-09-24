import { inject, Injectable, Signal } from "@angular/core";
import { ProductItemCart } from "../interfaces/product.interface";
import { signalSlice } from "ngxtension/signal-slice";
import { StorageService } from "./storage.service";
import { map, Observable } from "rxjs";

interface state{
products: ProductItemCart[];
loaded: boolean;
}
@Injectable({
    providedIn: 'root',
})

export class CartStateService {

    private _storageService = inject(StorageService);

    private initialState: state = {
        products: [],
        loaded: false
    };  

    loadProducts$ = this._storageService.loadProduct().pipe(
    map((products) => ({products, loaded: true})),
)

    state = signalSlice({
        initialState: this.initialState,
        sources: [this.loadProducts$],
        actionSources:{
            add: (state, action$: Observable<ProductItemCart>) =>
            action$.pipe(
                map((product) => this.add(state, product)),
                
            ),

        },
        effects: (state) => ({
            load: () => {
                console.log('load products');
            }
    })
    });

    private add(state: Signal<state>, product: ProductItemCart) {
        
        const isInCart = state().products.find(
            (productInCart) => productInCart.product.id === product.product.id,
        );

        if (!isInCart) {
            return {
                product: [...state().products, {...product, quantity:  + 1}],
        };
    }
    isInCart.quantity += 1;
    return{
        products: [...state().products],
    };
}
}