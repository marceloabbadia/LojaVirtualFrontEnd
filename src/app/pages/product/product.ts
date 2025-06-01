import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class ProductPage implements OnInit {
  isAuthenticated = true;
  inWishlist = false;
  product!: Product;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http
      .get<Product>(`http://localhost:3000/product/${id}`)
      .subscribe((data) => (this.product = data));
  }

  imageUrl(photo: string): string {
    return `http://localhost:3000/images/${photo}`;
  }

  toggleWishlist() {
    const newWishlistState = !this.product.wishlist;

    this.http
      .patch(`http://localhost:3000/product/wishlist/${this.product._id}`, {})
      .subscribe(() => {
        this.product.wishlist = newWishlistState;
        console.log('Wishlist atualizada no backend:', this.product.wishlist);
      });
  }
}
