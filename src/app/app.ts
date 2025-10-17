import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header as HeaderComponent } from './shared/ui/header/header';
import { CommonModule } from '@angular/common';
import { CartSidebar } from './cart/cart-sidebar/cart-sidebar';
import { CartStateService } from './shared/data-access/cart-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule, CartSidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('store');
  private router = inject(Router);
  cartState = inject(CartStateService).state;

get isCartPage(): boolean {
    return this.router.url === '/cart';
  }
}