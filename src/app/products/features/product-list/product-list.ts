import { Component, inject } from '@angular/core';
import { ProductsStateService } from '../../data-access/products-state.service';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.html',
  styles: ``,
  providers: [ProductsStateService]
  
})

export default class ProductListComponent {
  productState = inject(ProductsStateService);
}

