import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { NotFound } from './pages/not-found/not-found';
import { Register } from './pages/register/register';
import { ProductPage } from './pages/product/product';
import { LoginComponent } from './pages/login/login';
import { WishlistComponent } from './pages/wishlist/wishlist';
import { Admin } from './pages/admin/admin';
import { Profile } from './pages/profile/profile';
import { EditProfile } from './pages/edit-profile/edit-profile';
import { ProductManagement } from './pages/admin/product-management/product-management';
import { AdminGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'products',
    component: Products,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'profile',
    component: Profile,
  },
  {
    path: 'edit-profile',
    component: EditProfile,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'highlight',
    component: Highlight,
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
  },
  {
    path: 'product/:id',
    component: ProductPage,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: Admin,
    canActivate: [AdminGuard],
  },
  {
    path: 'product-management',
    component: ProductManagement,
    canActivate: [AdminGuard],
  },
  { path: '**', component: NotFound },
];
