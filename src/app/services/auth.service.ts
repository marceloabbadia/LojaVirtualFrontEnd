import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLoggedIn = false;

  constructor(private router: Router) {
    const user = sessionStorage.getItem('utilizadorAtivo');
    this._isLoggedIn = !!user;
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  async login(email: string, password: string): Promise<true | string> {
    try {
      const response: any = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }

      sessionStorage.setItem('utilizadorAtivo', JSON.stringify(data.user));
      this._isLoggedIn = true;
      return true;
    } catch (err: any) {
      this._isLoggedIn = false;
      return err.message || 'E-mail ou senha inválidos';
    }
  }

  logout() {
    sessionStorage.removeItem('utilizadorAtivo');
    this._isLoggedIn = false;
    location.reload();
  }
}
