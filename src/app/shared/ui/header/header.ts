import { Component, inject, signal } from '@angular/core';
import {  Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartStateService } from '../../data-access/cart-state.service';
import { ProductsService } from '../../../products/data-access/products.service';
import { ProductsStateService } from '../../../products/data-access/products-state.service';
import { CommonModule } from '@angular/common';
import { Search } from '../search/search'; 
import { HeaderPhone } from './header-phone/header-phone';
import { WishlistStateService } from '../../data-access/wishlist-state.service';

@Component({
  selector: 'app-header',
   standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, Search, HeaderPhone],
  templateUrl: './header.html',
  styles: ``
})
export class Header {
  cartState = inject(CartStateService).state;
  productsService = inject(ProductsService);
  productStateService = inject(ProductsStateService, { optional: true });
  wishlistState = inject(WishlistStateService).state;
    private router = inject(Router);

  categories = signal<string[]>([]);

  ngOnInit(): void {
    this.productsService.getCategories().subscribe(cats => {
      this.categories.set(cats);
    });
  }

   selectCategory(category: string | null) {
    this.router.navigate(['/']); 
    this.productStateService?.state.filterByCategory(category);
  }
}