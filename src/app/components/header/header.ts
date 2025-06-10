import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../../pages/login/login';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, LoginComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header implements OnInit {
  user: any = null;

  constructor(
    public authService: AuthService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  confirmLogout(): void {
    this.modalService.open('Fecho de Sessão', 'Quer terminar a sessão?', () => {
      this.authService.logout();
    });
  }
}
