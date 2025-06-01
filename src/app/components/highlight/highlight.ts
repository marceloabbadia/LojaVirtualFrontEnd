import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

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
}

@Component({
  selector: 'app-highlight',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './highlight.html',
  styleUrl: './highlight.css',
})
export class Highlight implements OnInit {
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<Product[]>('http://localhost:3000/product/highlights')
      .subscribe((data) => (this.products = data));
  }

  imageUrl(p: Product): string {
    return `http://localhost:3000/images/${p.mainPhoto}`;
  }
}
