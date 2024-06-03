import { AfterRenderPhase, Injectable, OnInit, afterNextRender } from '@angular/core';
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

  getUsername(): string | null { return localStorage.getItem('username'); }

  setAuthToken(token: string, username: string): void {
    localStorage.setItem('token', token)
    localStorage.setItem("username", username)
  }

  removeAuthToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  // constructor() { }

  // isAuthenticated(): boolean {
  //   return !!this.getAuthToken();
  // }

  // getAuthToken(): string | null {
  //   console.log(document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] || null);
  //   return document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] || null;
  // }

  // isAuthenticated(req: Request): boolean {
  //   return !!this.getAuthToken(req);
  // }

  // getAuthToken(req: Request): string | null {
  //   const cookieHeader = req.headers.get('cookie');
  //   if (cookieHeader) {
  //     const cookies = cookieHeader.split('; ');
  //     const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
  //     if (tokenCookie) {
  //       return tokenCookie.split('=')[1] || null;
  //     }
  //   }
  //   return null;
  // }

  // setAuthToken(token: string): void {
  //   document.cookie = `token=${token}`;
  // }

  // removeAuthToken(): void {
  //   document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  // }

}
