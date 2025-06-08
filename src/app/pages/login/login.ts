import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  showModal = false;
  loginData = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

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
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Preencha todos os campos.';
      return;
    }

    if (!this.isValidEmail(this.loginData.email)) {
      this.errorMessage = 'E-mail inválido!';
      return;
    }

    this.authService
      .login(this.loginData.email, this.loginData.password)
      .then((result) => {
        if (result === true) {
          this.closeModal();
          this.router.navigateByUrl('/');
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
