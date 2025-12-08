import { Component, inject, input, output } from '@angular/core';
import { Product } from '../../../shared/interfaces/product.interface';
import { RouterLink } from "@angular/router";
import { WishlistStateService } from '../../../shared/data-access/wishlist-state.service';
@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styles: ``
})
export class ProductCard {

  wishlistState = inject(WishlistStateService).state;
  product = input.required<Product>();
  
  
  addToCart = output<Product>();
    add(event:Event)
    {
      event.stopPropagation()
      event.preventDefault()
      this.addToCart.emit(this.product());
    }

    // añadir/quitar a deseados
    toggleWishlist(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.wishlistState.toggle(this.product());
  }

  inWishlist() {
    return this.wishlistState.products().some(p => p.id === this.product().id);
  }

}