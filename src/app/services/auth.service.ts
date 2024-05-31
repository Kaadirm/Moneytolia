import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getAuthToken(): string | null { return localStorage.getItem('token'); }

  setAuthToken(token: string): void { localStorage.setItem('token', token); }

  removeAuthToken(): void { localStorage.removeItem('token'); }

}
