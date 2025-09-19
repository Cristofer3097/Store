import { Injectable, getNgModuleById, inject } from "@angular/core";
import { Product } from "../../shared/interfaces/product.interface";
import { signalSlice } from "ngxtension/signal-slice";
import { ProductsService } from "./products.service";
import { map, Observable,  switchMap } from "rxjs";

interface State {
    product: Product | null;
    status: 'loading' | 'error' | 'success';
}

@Injectable()
export class ProductsDetailStateService {
    private productsService = inject(ProductsService);
    private initialState: State = {
        product: null,
        status: 'loading' as const,
    };


    state = signalSlice({
        initialState: this.initialState,
        actionSources: {
           getById: (_state, $: Observable<string>) => $.pipe(
            switchMap((id) => this.productsService.getProduct(id)),
            map((data) => ({product: data, status:'success' as const})),),

           }
    })

}