import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartStateService } from '../../../../shared/data-access/cart-state.service';
import { ProductsService } from '../../../../products/data-access/products.service';
import { Product } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-recommended',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <div class="mt-8">
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        @for (product of randomProducts(); track product.id) {
          <div class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            
            <div class="aspect-square w-full overflow-hidden bg-white p-4">
              <img [src]="product.image" [alt]="product.title" class="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-105">
            </div>

            <div class="flex flex-1 flex-col p-4 space-y-2">
              <h3 class="text-sm font-medium text-gray-900 line-clamp-2 dark:text-white">
                {{ product.title }}
              </h3>
              
              <div class="mt-auto flex items-center justify-between">
                <p class="text-lg font-bold text-gray-900 dark:text-white">
                  {{ product.price | currency }}
                </p>
                
                <button 
                  (click)="addToCart(product)"
                  class="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-300"
                  title="Añadir al carrito">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class Recommended implements OnInit {
  private productsService = inject(ProductsService);
  private cartState = inject(CartStateService).state;
  
  // Signal para almacenar los productos aleatorios
  randomProducts = signal<Product[]>([]);

  ngOnInit() {
    // Pedimos productos (limit 20 para tener variedad donde elegir)
    this.productsService.getProducts(1).subscribe({
      next: (products) => {
        // Lógica para mezclar (Shuffle) y tomar 4
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