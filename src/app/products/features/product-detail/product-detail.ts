import { Component, effect, inject, input } from '@angular/core';
import { ProductsDetailStateService } from '../../data-access/products-detail-state.service';
import { CurrencyPipe } from '@angular/common';
import { CartStateService } from '../../../shared/data-access/cart-state.service';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe],
  templateUrl: './product-detail.html',
  providers: [ProductsDetailStateService],
})
export default class ProductDetailComponent {
  productDetailState = inject(ProductsDetailStateService).state;
  cartState = inject(CartStateService).state;

  id= input.required<string>();

  constructor() {
    effect(() => {
      this.productDetailState.getById(this.id());
  });
  
}
addtoCart(){
  this.cartState.add({
      product: this.productDetailState.product()!,
      quantity: 1
    });
}
}
