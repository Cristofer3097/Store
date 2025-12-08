import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartStateService } from '../../../../shared/data-access/cart-state.service';
import { ProductsService } from '../../../../products/data-access/products.service';
import { Product } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-recommended',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
    templateUrl: './recomended.html',
  styles: []
})
export class Recommended implements OnInit {
  private productsService = inject(ProductsService);
  private cartState = inject(CartStateService).state;
  
  randomProducts = signal<Product[]>([]);

  ngOnInit() {
    this.productsService.getProducts(1).subscribe({
      next: (products) => {
        const shuffled = products.sort(() => 0.5 - Math.random());
        this.randomProducts.set(shuffled.slice(0, 4));
      },
      error: (err) => console.error(err)
    });
  }

  addToCart(product: Product) {
    this.cartState.add({
      product: product,
      quantity: 1
    });
  }
}