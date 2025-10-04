import { Injectable } from "@angular/core";
import { BaseHttService } from "../../shared/data-access/base-http.service";
import { Observable } from "rxjs";
import { Product } from "../../shared/interfaces/product.interface";

export const LIMIT = 8;

@Injectable({providedIn: 'root'})
export class ProductsService extends BaseHttService {
    getProducts(page: number, category?: string | null): Observable <Product[]> {
        if (category) {
            // Si hay una categoría se filtra.
            return this.http.get<Product[]>(`${this.apiUrl}/products/category/${category}`);
        }
        
        // paginación si no hay categoría.
        return this.http.get<any[]>(`${this.apiUrl}/products`, {
            params: { 
              limit: page * LIMIT,
            },
        });
    }

    getProduct(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
    }

    // Método para obtener las categorías.
    getCategories(): Observable<string[]> {
        return this.http.get<string[]>(`${this.apiUrl}/products/categories`);
    }
}

