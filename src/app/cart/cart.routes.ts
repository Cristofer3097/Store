import { Routes } from '@angular/router';

export default[
    {
        path: '',
        loadComponent: () => import('./cart').then(c => c.Cart)}
] as Routes;