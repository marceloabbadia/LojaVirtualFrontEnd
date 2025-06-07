import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../../pages/login/login';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, LoginComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(public authService: AuthService) {}
}
