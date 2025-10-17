import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductItemCart } from '../../shared/interfaces/product.interface';
import { CartStateService } from '../../shared/data-access/cart-state.service';


@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './cart-sidebar.html',
})
export class CartSidebar {
  cartState = inject(CartStateService).state;
  private router = inject(Router);

  onIncrement(product: ProductItemCart) {
    this.cartState.upadate({ ...product, quantity: product.quantity + 1 });
  }

  onDecrease(product: ProductItemCart) {
    // La lógica en tu servicio ya elimina el producto si la cantidad es 0
    this.cartState.upadate({ ...product, quantity: product.quantity - 1 });
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}