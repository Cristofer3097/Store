import { Component, inject } from '@angular/core';
import { ProductsStateService } from '../../data-access/products-state.service';
import { ProductCard } from '../../ui/product-card/product-card';
import { CartStateService } from '../../../shared/data-access/cart-state.service';
import { Product } from '../../../shared/interfaces/product.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard,  CommonModule],
  templateUrl: './product-list.html',
  styles: ``,
  
})

export default class ProductListComponent {
    private productStateService = inject(ProductsStateService);

  productState = this.productStateService.state; 
  cartState = inject(CartStateService).state;

 nextPage() {
    this.productState.nextPage();
  }

  previousPage() {
    this.productState.previousPage();
  }

addToCart(product: Product) {
  this.cartState.add({
    product,
    quantity: 1,
  });
}
}