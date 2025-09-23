import { inject, Injectable } from "@angular/core";
import { ProductItemCart } from "../interfaces/product.interface";
import { signalSlice } from "ngxtension/signal-slice";
import { StorageService } from "./storage.service";
import { map } from "rxjs";

interface state{
products: ProductItemCart[];
loaded: boolean;
}
@Injectable({
    providedIn: 'root'
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
    })
}
