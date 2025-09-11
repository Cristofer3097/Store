import { Component, inject } from '@angular/core';
import { ProductsService } from '../data-access/products.service';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.html',
  styles: ``
})
export default class ProductListComponent {
private productService = inject(ProductsService);

constructor() {
  this.productService.getProducts().subscribe((products) => {
    console.log(products);
  });
}
}
