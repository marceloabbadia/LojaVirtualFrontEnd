import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  isAuthenticated = true;
  products: Product[] = [];
  visibleProducts: Product[] = [];
  itemsPerPage = 3;
  currentPage = 1;

  selectedType: string | null = null;
  selectedColor: string | null = null;

  sortedTypes: string[] = [];
  sortedColors: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<Product[]>('http://localhost:3000/product')
      .subscribe((data) => {
        this.products = data;
        this.loadMore();

        this.sortedTypes = [...new Set(data.map((p) => p.productType))]
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b));
        this.sortedTypes.push('Todos');

        this.sortedColors = [...new Set(data.map((p) => p.color))]
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b));
        this.sortedColors.push('Todos');
      });
  }

  get filteredTotal(): number {
    return this.products.filter(
      (p) =>
        (!this.selectedType ||
          this.selectedType === 'Todos' ||
          p.productType === this.selectedType) &&
        (!this.selectedColor ||
          this.selectedColor === 'Todos' ||
          p.color === this.selectedColor)
    ).length;
  }

  get filteredProducts(): Product[] {
    return this.products
      .filter(
        (p) =>
          (!this.selectedType ||
            this.selectedType === 'Todos' ||
            p.productType === this.selectedType) &&
          (!this.selectedColor ||
            this.selectedColor === 'Todos' ||
            p.color === this.selectedColor)
      )
      .slice(0, this.currentPage * this.itemsPerPage);
  }

  loadMore() {
    this.currentPage++;
  }

  imageUrl(photo: string): string {
    return `http://localhost:3000/images/${photo}`;
  }

  toggleWishlist(product: Product, event: Event) {
    event.stopPropagation();
    const newWishlistState = !product.wishlist;

    this.http
      .patch(`http://localhost:3000/product/wishlist/${product._id}`, {})
      .subscribe({
        next: () => {
          product.wishlist = newWishlistState;
        },
        error: (err) => {
          console.error('Erro ao atualizar wishlist:', err);
          alert('Falha ao atualizar a lista de desejos.');
        },
      });
  }
}
