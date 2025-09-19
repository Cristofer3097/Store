import { Component, effect, inject, input } from '@angular/core';
import { ProductsDetailStateService } from '../../data-access/products-detail-state.service';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  providers: [ProductsDetailStateService],
})
export default class ProductDetailComponent {
  productDetailState = inject(ProductsDetailStateService).state;

  id= input.required<string>();

  constructor() {
    effect(() => {
      this.productDetailState.getById(this.id());
  });
  }
}
