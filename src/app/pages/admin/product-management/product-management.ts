import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-management.html',
  styleUrl: './product-management.css',
})
export class ProductManagement {
  product = {
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

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost:3000/product', this.product).subscribe({
      next: () => {
        alert('Produto cadastrado com sucesso!');
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar produto:', err);
        alert('Erro ao cadastrar produto.');
      },
    });
  }
}
