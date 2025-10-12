import { Component, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Search } from '../../search/search';

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

  // Emite un evento cuando se selecciona una categoría
  @Output() categorySelected = new EventEmitter<string | null>();

  private router = inject(Router);
  
  // La lógica para abrir/cerrar el menú ahora vive aquí
  isDropdownOpen = signal(false);

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
}