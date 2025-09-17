import { Component, inject } from '@angular/core';
import { ProductsStateService } from '../../data-access/products-state.service';
import { ProductCard } from '../../ui/product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styles: ``,
  providers: [ProductsStateService]
  
})

export default class ProductListComponent {
  productState = inject(ProductsStateService);
}

