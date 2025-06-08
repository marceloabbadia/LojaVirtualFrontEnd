import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../login/login';
import { CommonModule } from '@angular/common';

interface Product {
  _id: string;
  name: string;
  productType: string;
  color: string;
  brand: string;
  price: number;
  description: string;
  mainPhoto: string;
  secondaryPhoto: string;
  wishlist?: boolean;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, LoginComponent],
  templateUrl: './product.html',
})
export class ProductPage implements OnInit {
  product!: Product;

  @ViewChild('loginModal') loginModal!: LoginComponent;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private wishlistService: WishlistService,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.error('ID do produto não fornecido');
      return;
    }
    this.loadProduct(id);
  }

  loadProduct(id: string) {
    this.http.get<Product>(`http://localhost:3000/product/${id}`).subscribe({
      next: (data) => {
        this.product = { ...data };
        if (this.isAuthenticated) {
          this.checkIfInWishlist();
        }
      },
      error: (err) => {
        console.error('Erro ao carregar produto:', err);
      },
    });
  }

  checkIfInWishlist() {
    const userJson = sessionStorage.getItem('utilizadorAtivo');
    let user = null;

    try {
      user = userJson ? JSON.parse(userJson) : null;
    } catch {
      user = null;
    }

    if (user && user._id) {
      this.http
        .get<Product[]>(
          `http://localhost:3000/auth/wishlist/me?userId=${user._id}`
        )
        .subscribe({
          next: (wishlistProducts) => {
            this.product.wishlist = wishlistProducts.some(
              (p) => p._id === this.product._id
            );
          },
          error: () => {
            this.product.wishlist = false;
          },
        });
    } else {
      this.product.wishlist = false;
    }
  }

  toggleWishlist(product: Product, event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.isAuthenticated) {
      this.openLoginModal();
      return;
    }

    const newWishlistState = !product.wishlist;

    this.wishlistService.toggleWishlist(product._id).subscribe({
      next: () => {
        product.wishlist = newWishlistState;
      },
      error: (err) => {
        alert('Falha ao atualizar wishlist.');
        console.error(err);
      },
    });
  }

  get isAuthenticated(): boolean {
    return this.authService.isLoggedIn;
  }

  openLoginModal(): void {
    if (this.loginModal && typeof this.loginModal.openModal === 'function') {
      this.loginModal.openModal();
    } else {
      alert('Você precisa estar logado para usar a wishlist.');
    }
  }

  imageUrl(path: string): string {
    return `http://localhost:3000/images/${path}`;
  }
}
