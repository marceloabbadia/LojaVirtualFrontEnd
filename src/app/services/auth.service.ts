import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user: any = null;
  private userSubject = new BehaviorSubject<any>(null);

  constructor(private router: Router) {
    const userJson = sessionStorage.getItem('utilizadorAtivo');
    if (userJson) {
      this._user = JSON.parse(userJson);
      this.userSubject.next(this._user);
    }
  }

  get isLoggedIn(): boolean {
    return !!this._user;
  }

  get user() {
    return this._user;
  }

  get user$() {
    return this.userSubject.asObservable();
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

      const userData = data.user;

      sessionStorage.setItem('utilizadorAtivo', JSON.stringify(userData));
      this._user = userData;
      this.userSubject.next(userData);
      return true;
    } catch (err: any) {
      console.error('Erro no login:', err);
      return err.message || 'E-mail ou senha inválidos';
    }
  }

  logout() {
    sessionStorage.removeItem('utilizadorAtivo');
    this._user = null;
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }
}
