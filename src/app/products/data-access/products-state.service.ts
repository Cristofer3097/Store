import { Injectable, inject } from "@angular/core";
import { Product } from "../../shared/interfaces/product.interface";
import { signalSlice } from "ngxtension/signal-slice";
import { ProductsService } from "./products.service";
import { map } from "rxjs";

interface State {
    products: Product[];
    status: 'loading' | 'error' | 'success';
}

@Injectable()
export class ProductsStateService {
    private productsService = inject(ProductsService);
    private initialState: State = {
        products: [],
        status: 'loading' as const,
    };

    state = signalSlice({
        initialState: this.initialState,
        sources:[
            this.productsService.getProducts().pipe(map((products) => ({products, status:'success' as const}) )),
        ]
    })

}