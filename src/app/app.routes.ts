import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { NotFound } from './pages/not-found/not-found';
import { Register } from './pages/register/register';
import { Wishlist } from './pages/wishlist/wishlist';
import { ProductPage } from './pages/product/product';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'products',
    component: Products,
  },
  {
    path: 'register',
    component: Register,
  },
  { path: 'highlight', component: Highlight },
  { path: 'wishlist', component: Wishlist },
  { path: 'product/:id', component: ProductPage },
  { path: '**', component: NotFound },
];
