import { Component, inject } from '@angular/core';
import { CartItem } from './ui/cart-item/cart-item';
import { CartStateService } from '../shared/data-access/cart-state.service';

@Component({
  selector: 'app-cart',
  imports: [CartItem],
  templateUrl: './cart.html',
  styles: ``
})
export class Cart {
  state = inject(CartStateService).state;

  onRemove(id: number) {
    this.state.remove(id);
  }

}
