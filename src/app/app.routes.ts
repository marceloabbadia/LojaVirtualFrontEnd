import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { NotFound } from './pages/not-found/not-found';
import { Register } from './pages/register/register';
import { ProductPage } from './pages/product/product';
import { LoginComponent } from './pages/login/login';
import { WishlistComponent } from './pages/wishlist/wishlist';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  { path: 'products', component: Products, runGuardsAndResolvers: 'always' },
  {
    path: 'register',
    component: Register,
  },
  { path: 'highlight', component: Highlight },
  { path: 'wishlist', component: WishlistComponent },
  {
    path: 'product/:id',
    component: ProductPage,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '**', component: NotFound },
];
