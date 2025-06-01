import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Product {
  _id: string;
  name: string;
  price: number;
  mainPhoto: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<Product[]>('http://localhost:3000/product')
      .subscribe((data) => (this.products = data.slice(0, 8)));
  }

  imageUrl(p: Product): string {
    return `http://localhost:3000/images/${p.mainPhoto}`;
  }
}
