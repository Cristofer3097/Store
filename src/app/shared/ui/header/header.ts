import { Component, inject, signal } from '@angular/core';
import {  Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartStateService } from '../../data-access/cart-state.service';
import { ProductsService } from '../../../products/data-access/products.service';
import { ProductsStateService } from '../../../products/data-access/products-state.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Search } from '../search/search'; 
import { HeaderPhone } from './header-phone/header-phone';

@Component({
  selector: 'app-header',
   standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe, RouterLinkActive, Search, HeaderPhone],
  templateUrl: './header.html',
  styles: ``
})
export class Header {
  cartState = inject(CartStateService).state;
  productsService = inject(ProductsService);
  productStateService = inject(ProductsStateService, { optional: true });
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