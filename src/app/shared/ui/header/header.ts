import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartStateService } from '../../data-access/cart-state.service';
import { ProductsService } from '../../../products/data-access/products.service';
import { ProductsStateService } from '../../../products/data-access/products-state.service';
import { CommonModule } from '@angular/common';
import { Search } from '../search/search'; 

@Component({
  selector: 'app-header',
   standalone: true,
  imports: [CommonModule,RouterLink, RouterLinkActive, Search],
  templateUrl: './header.html',
  styles: ``
})
export class Header {
  cartState = inject(CartStateService).state;
  productsService = inject(ProductsService);
  productStateService = inject(ProductsStateService, { optional: true });

  categories = signal<string[]>([]);
  isDropdownOpen = signal(false);

  ngOnInit(): void {
    this.productsService.getCategories().subscribe(cats => {
      this.categories.set(cats);
    });
  }

  toggleDropdown() {
    this.isDropdownOpen.update(open => !open);
  }

  selectCategory(category: string | null) {

    this.productStateService?.state.filterByCategory(category);
    this.isDropdownOpen.set(false); 
  }
}

