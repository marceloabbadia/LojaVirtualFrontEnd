import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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
  wishlist: boolean;
}

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist implements OnInit {
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Product[]>('http://localhost:3000/product/').subscribe({
      next: (data) => {
        this.products = data.filter((p) => p.wishlist === true);
      },
      error: (err) => {
        console.error('Erro ao carregar wishlist:', err);
      },
    });
  }

  removeFromWishlist(product: Product, event: Event): void {
    event.stopPropagation();

    const newWishlistState = false;

    this.http
      .patch(`http://localhost:3000/product/wishlist/${product._id}`, {})
      .subscribe({
        next: () => {
          product.wishlist = newWishlistState;

          this.products = this.products.filter(
            (prod) => prod._id !== product._id
          );
        },
        error: (err) => {
          console.error('Erro ao remover da wishlist:', err);
          alert('Falha ao remover o produto da lista de desejos.');
        },
      });
  }
  // falta colocar o o aviso quando retirar ou incluir o produto na wishlist e incluir carrinho

  imageUrl(p: Product): string {
    return `http://localhost:3000/images/${p.mainPhoto}`;
  }
}
