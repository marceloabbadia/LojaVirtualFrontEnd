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
        this.product = { ...data, wishlist: false };
        if (this.authService.isLoggedIn) {
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
        .get<{ wishlist: string[] }>(
          `http://localhost:3000/auth/wishlist/me?userId=${user._id}`
        )
        .subscribe({
          next: (userData) => {
            this.product.wishlist = userData.wishlist.includes(
              this.product._id
            );
            this.cd.detectChanges();
          },
          error: (err) => {
            console.warn('Erro ao verificar wishlist:', err);
            this.product.wishlist = false;
            this.cd.detectChanges();
          },
        });
    } else {
      this.product.wishlist = false;
      this.cd.detectChanges();
    }
  }

  get isAuthenticated(): boolean {
    return this.authService.isLoggedIn;
  }

  toggleWishlist(product: Product, event: Event): void {
    event.stopPropagation();

    if (!this.isAuthenticated) {
      this.openLoginModal();
      return;
    }

    const newWishlistState = !product.wishlist;

    this.wishlistService.toggleWishlist(product._id).subscribe({
      next: () => {
        product.wishlist = newWishlistState;
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Falha ao atualizar wishlist.');
        console.error(err);
      },
    });
  }

  openLoginModal() {
    if (this.loginModal && typeof this.loginModal.openModal === 'function') {
      this.loginModal.openModal();
    } else {
      alert('Você precisa estar logado para usar a wishlist.');
    }
  }

  imageUrl(photo: string): string {
    return `http://localhost:3000/images/${photo}`;
  }
}
