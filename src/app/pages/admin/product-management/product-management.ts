import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  _id: string;
  name: string;
  brand: string;
  productType: string;
  color: string;
  price: number;
  description: string;
  mainPhoto: string;
  secondaryPhoto: string;
  highlight: boolean;
}

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-management.html',
  styleUrls: ['./product-management.css'],
})
export class ProductManagement implements OnInit {
  products: Product[] = [];

  newProduct: Partial<Product> = {
    name: '',
    brand: '',
    productType: '',
    color: '',
    price: 0,
    description: '',
    mainPhoto: '',
    secondaryPhoto: '',
    highlight: false,
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<Product[]>('http://localhost:3000/product').subscribe({
      next: (data) => {
        this.products = data.map(p => ({
          ...p,
          highlight: p.highlight || false
        }));
      },
      error: (err) => console.error('Erro ao carregar produtos:', err),
    });
  }

  onSubmit() {
    this.http.post('http://localhost:3000/product', this.newProduct).subscribe(() => {
      this.loadProducts();
      this.resetForm();
    });
  }

  resetForm() {
    this.newProduct = {
      name: '',
      brand: '',
      productType: '',
      color: '',
      price: 0,
      description: '',
      mainPhoto: '',
      secondaryPhoto: '',
      highlight: false,
    };
  }

  toggleHighlight(product: Product, event: Event): void {
    event.stopPropagation();
    const updatedHighlight = !product.highlight;

    this.http.patch(`http://localhost:3000/product/${product._id}`, {
      highlight: updatedHighlight,
    }).subscribe(() => {
      product.highlight = updatedHighlight;
    });
  }
}
