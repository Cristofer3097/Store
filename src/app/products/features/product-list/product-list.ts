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
  productState = inject(ProductsStateService);
  cartState = inject(CartStateService).state;

nextPage() {
  const page = this.productState.state().page;
  this.productState.nextPage$.next(page + 1);
}
addToCart(product: Product) {
  this.cartState.add({
    product,
    quantity: 1,
  });
}
}