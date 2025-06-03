import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  morada: string;
  codigoPostal: string;
  pais: string;
}

@Injectable({ providedIn: 'root' })
export class RegisterService {
  private apiUrl = 'http://localhost:3000/utilizadores';

  constructor(private http: HttpClient) {}

  register(data: RegisterData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
