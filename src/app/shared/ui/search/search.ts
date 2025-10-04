import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductsStateService } from '../../../products/data-access/products-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.html',
  styles: ``
})
export class Search implements OnInit {
  private productsState = inject(ProductsStateService);
  searchControl = new FormControl('');

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(400), // Espera 400ms después de la última pulsación
      distinctUntilChanged() // Solo emite si el valor ha cambiado
    ).subscribe(value => {
      this.productsState.state.search(value || '');
    });
  }
}