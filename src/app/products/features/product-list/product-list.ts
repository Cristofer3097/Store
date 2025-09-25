import { Component, inject } from '@angular/core';
import { ProductsStateService } from '../../data-access/products-state.service';
import { ProductCard } from '../../ui/product-card/product-card';
import { CartStateService } from '../../../shared/data-access/cart-state.service';
import { Product } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styles: ``,
  providers: [ProductsStateService]
  
})

export default class ProductListComponent {
  productState = inject(ProductsStateService);
  cartState = inject(CartStateService).state;

changePage() {
  const page = this.productState.state().page;
  this.productState.changePage$.next(page + 1);
}
addToCart(product: Product) {
  this.cartState.add({
    product,
    quantity: 1,
  });
}
}