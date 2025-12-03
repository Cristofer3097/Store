import { Component, inject } from '@angular/core';
import { CartItem } from './ui/cart-item/cart-item';
import { CartStateService } from '../shared/data-access/cart-state.service';
import { Product, ProductItemCart } from '../shared/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';
import { Recommended } from './ui/cart-item/recommended/recommended';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItem, CurrencyPipe, Recommended],
  templateUrl: './cart.html',
  styles: ``
})
export class Cart {
  state = inject(CartStateService).state;

  onRemove(id: number) {
    this.state.remove(id);
  }

  onIncrement(product: ProductItemCart) {

    this.state.upadate({...product, quantity: product.quantity + 1});
  }
  onDecrease(product: ProductItemCart) {
    this.state.upadate({ 
    ...product, 
    quantity: product.quantity -1,
  });
  
}

  cartState = inject(CartStateService).state;

  onCheckout() {
    this.cartState.clear();
  }

}
