import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  showModal = false;
  loginData = { email: '', password: '' };
  errorMessage = '';

  constructor(private loginService: LoginService, private router: Router) {}

  openModal() {
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.showModal = false;
    this.errorMessage = '';
    this.loginData = { email: '', password: '' };
    document.body.style.overflow = '';
  }

  onSubmit() {
    this.errorMessage = '';

    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Os dois campos são de preenchimento obrigatório!';
      return;
    }

    if (!this.isValidEmail(this.loginData.email)) {
      this.errorMessage = 'O e-mail tem um formato incorrecto!';
      return;
    }

    this.loginService
      .login(this.loginData.email, this.loginData.password)
      .then((result) => {
        if (result === true) {
          this.closeModal();
          this.router.navigate(['/']);
        } else {
          this.errorMessage = result as string;
        }
      });
  }

  isValidEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}
