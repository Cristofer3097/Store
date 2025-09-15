import { Injectable } from "@angular/core";
import { BaseHttService } from "../../shared/data-access/base-http.service";
import { Observable } from "rxjs";
import { Product } from "../../shared/interfaces/product.interface";

@Injectable({providedIn: 'root'})
export class ProductsService extends BaseHttService {
    getProducts(): Observable <Product[]> {
        return this.http.get<any[]>(`${this.apiUrl}/products`);
    }
}

