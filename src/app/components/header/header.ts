import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoginComponent } from "../../pages/login/login";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, LoginComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header implements OnInit {
  user: any = null;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((currentUser) => {
      this.user = currentUser;
    });
  }
}
