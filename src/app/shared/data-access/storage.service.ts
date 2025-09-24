import { Injectable, output } from "@angular/core";
import { Observable, of } from "rxjs";
import { Product, ProductItemCart } from "../interfaces/product.interface";

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    loadProduct(): Observable<ProductItemCart[]> {
        const rawProducts = localStorage.getItem('products');
        return of(rawProducts ? JSON.parse(rawProducts) : []);
}
    saveProducts(products: ProductItemCart[]): void {
        localStorage.setItem('products', JSON.stringify(products));
    }
    
}