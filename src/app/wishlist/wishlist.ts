import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { WishlistStateService } from '../shared/data-access/wishlist-state.service';
import { CartStateService } from '../shared/data-access/cart-state.service';
import { Product } from '../shared/interfaces/product.interface';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './wishlist.html',
})
export class WishlistComponent {
  wishlistState = inject(WishlistStateService).state;
  cartState = inject(CartStateService).state;

  remove(id: number) {
    this.wishlistState.remove(id);
  }

  move(index: number, direction: 'up' | 'down') {
    this.wishlistState.move({ index, direction });
  }

  addToCart(product: Product) {
    this.cartState.add({
      product: product,
      quantity: 1
    });
    // Opcional: Eliminar de deseados al agregar al carrito
    // this.remove(product.id); 
  }
}