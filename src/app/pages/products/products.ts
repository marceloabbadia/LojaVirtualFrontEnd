import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login';
import { ChangeDetectorRef } from '@angular/core';

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
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LoginComponent],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products implements OnInit {
  products: Product[] = [];
  itemsPerPage = 6;
  currentPage = 1;

  selectedType: string | null = 'Todos';
  selectedColor: string | null = 'Todos';

  sortedTypes: string[] = [];
  sortedColors: string[] = [];

  @ViewChild('loginModal') loginModal!: LoginComponent;

  get isAuthenticated(): boolean {
    return this.authService.isLoggedIn;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private wishlistService: WishlistService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProductsAndWishlist();
  }

  loadProductsAndWishlist(): void {
    if (this.isAuthenticated) {
      const user = JSON.parse(
        sessionStorage.getItem('utilizadorAtivo') || '{}'
      );

      this.http
        .get<Product[]>(
          `http://localhost:3000/auth/wishlist/me?userId=${user._id}`
        )
        .subscribe({
          next: (products) => {
            this.products = products;
            this.updateFilters();
          },
          error: () => {
            this.products = [];
            this.updateFilters();
          },
        });
    } else {
      this.http
        .get<Product[]>('http://localhost:3000/product')
        .subscribe((data) => {
          this.products = data.map((p) => ({ ...p, wishlist: false }));
          this.updateFilters();
        });
    }
  }

  updateFilters(): void {
    this.sortedTypes = [
      'Todos',
      ...Array.from(new Set(this.products.map((p) => p.productType))),
    ];
    this.sortedColors = [
      'Todos',
      ...Array.from(new Set(this.products.map((p) => p.color))),
    ];
  }

  get filteredTotal(): number {
    return this.products.filter((p) => this.matchesFilters(p)).length;
  }

  get filteredProducts(): Product[] {
    return this.products
      .filter((p) => this.matchesFilters(p))
      .slice(0, this.currentPage * this.itemsPerPage);
  }

  private matchesFilters(product: Product): boolean {
    const typeMatch =
      this.selectedType === 'Todos' ||
      !this.selectedType ||
      product.productType === this.selectedType;
    const colorMatch =
      this.selectedColor === 'Todos' ||
      !this.selectedColor ||
      product.color === this.selectedColor;
    return typeMatch && colorMatch;
  }

  loadMore(): void {
    this.currentPage++;
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
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Falha ao atualizar wishlist.');
        console.error(err);
      },
    });
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
