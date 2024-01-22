import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSource = new BehaviorSubject<boolean>(false);

  constructor(
    private _router: Router
  ) {
    // Inicializa el BehaviorSubject basado en el token existente
    this.isAuthenticatedSource.next(!!this.getToken());
  }

  setToken(token: string | null): void {
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
      this.isAuthenticatedSource.next(!!token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  get isAuthenticated() {
    return this.isAuthenticatedSource.asObservable();
  }

  logout(): void {
    this.setToken(null);
    this._router.navigate(['']);
  }
}
