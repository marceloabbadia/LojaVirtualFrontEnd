import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard {
  constructor(private authService: AuthService) {}

  canActivate: CanActivateFn = (route, state) => {
    const user = this.authService.user;

    if (!this.authService.isLoggedIn) {
      alert('Acesso negado. Faça login primeiro.');
      return false;
    }

    if (user && user.function === 'admin') {
      return true;
    }

    alert('Acesso negado. Você não é administrador.');
    return false;
  };
}
