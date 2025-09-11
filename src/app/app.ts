import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header as HeaderComponent } from './shared/ui/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('store');
}
