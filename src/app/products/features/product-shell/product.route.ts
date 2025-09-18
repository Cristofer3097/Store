import { Routes } from '@angular/router';
export default [
    {path: '', 
        loadComponent: () => import('../product-list/product-list.js'),

    },
    {
        path: 'product/:id',        
        loadComponent: () => import('../product-detail/product-detail.js'),
    }
] as Routes;