import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  _id: string;
  name: string;
  email: string;
  address?: string;
  cp4?: string;
  cp3?: string;
  country?: string;
  situation: 'disabled' | 'actived';
  function: 'cliente' | 'admin';
}

@Component({
  selector: 'app-user-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css',
})
export class UserManagement implements OnInit {
  users: User[] = [];

  newUser = {
    name: '',
    email: '',
    password: '',
    address: '',
    cp4: '',
    cp3: '',
    cplocal: '',
    country: '',
    situation: 'disabled' as const,
    function: 'cliente' as const,
  };
  user: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<User[]>('http://localhost:3000/utilizador').subscribe(
      (data) => {
        this.users = data.map((u) => ({
          ...u,
        }));
      },
      (err) => {
        console.error('Erro ao carregar utilizadores:', err);
      }
    );
  }

  onSituationChange(user: User) {
    this.http
      .patch(`http://localhost:3000/utilizador/${user._id}`, {
        situation: user.situation,
      })
      .subscribe(() => {});
  }

  onFunctionChange(user: User) {
    this.http
      .patch(`http://localhost:3000/utilizador/${user._id}`, {
        func: user.function,
      })
      .subscribe(() => {
        this.loadUsers();
      });
  }

  onRegister() {
    this.http.post('http://localhost:3000/utilizador', this.newUser).subscribe({
      next: () => {
        alert('Utilizador cadastrado com sucesso!');
        this.loadUsers();
        this.resetForm();
      },
      error: (err) => {
        if (
          err.status === 400 &&
          err.error.message.includes('E-mail já cadastrado')
        ) {
          alert('Este e-mail já está sendo usado.');
        } else {
          alert('Erro ao cadastrar utilizador.');
        }
        console.error(err);
      },
    });
  }

  resetForm() {
    this.newUser = {
      name: '',
      email: '',
      password: '',
      address: '',
      cp4: '',
      cp3: '',
      cplocal: '',
      country: '',
      situation: 'disabled',
      function: 'cliente',
    };
  }
}
