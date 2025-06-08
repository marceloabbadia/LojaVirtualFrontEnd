import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Product } from '../../product.interface/product.interface';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.css'],
})
export class WishlistComponent implements OnInit {
  products: Product[] = [];
  isAuthenticated = false;

  constructor(
    private wishlistService: WishlistService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn;

    if (this.isAuthenticated) {
      const user = JSON.parse(
        sessionStorage.getItem('utilizadorAtivo') || '{}'
      );

      this.wishlistService.getWishlist(user._id).subscribe({
        next: (data: Product[]) => {
          this.products = data.filter((p) => p.wishlist === true);
        },
        error: (err) => {
          console.error('Erro ao carregar wishlist:', err);
          this.products = [];
        },
      });
    }
  }

  removeFromWishlist(product: Product, event: Event): void {
    event.stopPropagation();

    if (!this.authService.isLoggedIn) {
      alert('Você precisa estar logado para editar a wishlist.');
      return;
    }

    this.wishlistService.toggleWishlist(product._id).subscribe({
      next: () => {
        this.products = this.products.filter((p) => p._id !== product._id);
      },
      error: (err) => {
        alert('Falha ao remover da wishlist.');
        console.error(err);
      },
    });
  }

  imageUrl(photo: string): string {
    return `http://localhost:3000/images/${photo}`;
  }
}
