import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  address: string;
  cp3: string;
  cp4: string;
  cplocal: string;
  country: string;
}

@Injectable({ providedIn: 'root' })
export class RegisterService {
  private apiUrl = 'http://localhost:3000/utilizadores';

  constructor(private http: HttpClient) {}

  register(data: RegisterData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
