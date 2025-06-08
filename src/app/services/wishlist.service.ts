import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Product } from '../product.interface/product.interface';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) {}

  toggleWishlist(productId: string): Observable<any> {
    if (!this.authService.isLoggedIn) {
      return throwError(() => new Error('Usuário não autenticado'));
    }

    const userJson = sessionStorage.getItem('utilizadorAtivo');
    const user = userJson ? JSON.parse(userJson) : null;

    if (!user || !user._id) {
      return throwError(() => new Error('Dados do utilizador inválidos'));
    }

    return this.http.patch(`${this.apiUrl}/auth/wishlist/${productId}`, {
      userId: user._id,
    });
  }

  getWishlist(userId: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiUrl}/auth/wishlist/me?userId=${userId}`
    );
  }
}
