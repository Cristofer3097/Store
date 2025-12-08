import { Component, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Search } from '../../search/search';
import { CartStateService } from '../../../data-access/cart-state.service';
import { ProductItemCart } from '../../../interfaces/product.interface';
import { WishlistStateService } from '../../../data-access/wishlist-state.service';

@Component({
  selector: 'app-header-phone',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, Search],
  templateUrl: './header-phone.html',
})
export class HeaderPhone {
  // Recibe datos del componente padre (header.ts)
  @Input({ required: true }) categories: string[] = [];
  @Input({ required: true }) cartState: any;
  wishlistState = inject(WishlistStateService).state;

  // Emite un evento cuando se selecciona una categoría
  @Output() categorySelected = new EventEmitter<string | null>();

  private router = inject(Router);
   private _cartStateService = inject(CartStateService);
  
  // La lógica para abrir/cerrar el menú ahora vive aquí
  isDropdownOpen = signal(false);
 showCategories = signal(false);

 toggleCategories() {
    this.showCategories.update(current => !current);
  }
  toggleDropdown() {
    this.isDropdownOpen.update(open => !open);
  }

  // Notifica al componente padre y cierra el menú
  selectCategory(category: string | null) {
    this.categorySelected.emit(category);
    this.isDropdownOpen.set(false);
  }

  // Navega al carrito y cierra el menú
  goToCart(): void {
    this.router.navigate(['/cart']);
    this.isDropdownOpen.set(false);
  }
 onIncrement(product: ProductItemCart) {
    this._cartStateService.state.upadate({ ...product, quantity: product.quantity + 1 });
  }

  onDecrease(product: ProductItemCart) {
    this._cartStateService.state.upadate({ ...product, quantity: product.quantity - 1 });
  }
}