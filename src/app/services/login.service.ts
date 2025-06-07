import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private apiUrl = 'http://localhost:3000/auth/login';

  constructor(private http: HttpClient, private router: Router) {}

  async login(email: string, password: string): Promise<true | string> {
    try {
      console.log(password);
      const result: any = await firstValueFrom(
        this.http.post(this.apiUrl, { email, password })
      );

      if (result && result.user) {
        sessionStorage.setItem('utilizadorAtivo', JSON.stringify(result.user));
        return true;
      }

      return result.message || 'Erro ao fazer login.';
    } catch (err: any) {
      console.error('Erro ao logar:', err);
      return err.error?.message || 'E-mail ou senha inválidos';
    }
  }

  logout() {
    sessionStorage.removeItem('utilizadorAtivo');
  }
}
