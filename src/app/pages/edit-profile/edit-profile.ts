import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  address?: string;
  cp4?: string;
  cp3?: string;
  cplocal?: string;
  country?: string;
  situation?: string;
}

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.html',
  styleUrls: ['./edit-profile.css'],
})
export class EditProfile implements OnInit {
  user: User | null = null;

  constructor(private http: HttpClient, public authService: AuthService) {}

  ngOnInit(): void {
    const userData = JSON.parse(
      sessionStorage.getItem('utilizadorAtivo') || '{}'
    );

    if (userData && userData._id) {
      this.http
        .get<User>(`http://localhost:3000/utilizador/${userData._id}`)
        .subscribe({
          next: (data) => {
            this.user = data;
          },
          error: (err) => {
            console.error('Erro ao carregar dados do utilizador:', err);
          },
        });
    }
  }

  onSave() {
    if (!this.user) return;

    this.http
      .patch(`http://localhost:3000/utilizador/${this.user._id}`, this.user)
      .subscribe({
        next: () => {
          alert('Dados atualizados com sucesso!');
          sessionStorage.setItem('utilizadorAtivo', JSON.stringify(this.user));
        },
        error: (err) => {
          alert('Falha ao salvar alterações.');
          console.error(err);
        },
      });
  }

  changePassword() {
    alert('Função "Alterar senha" ainda não implementada');
  }

  goBack() {
    window.history.back();
  }
}
