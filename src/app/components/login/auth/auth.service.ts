import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertConfirmationService } from '../../../services/alert-confirmation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSource = new BehaviorSubject<boolean>(false);
  private idAdmin = new BehaviorSubject<number | null>(null);
  private nombres = new BehaviorSubject<string | null>(null);
  private apellidos = new BehaviorSubject<string | null>(null);

  constructor(
    private _router: Router,
    private _alertService: AlertConfirmationService
  ) {
    // Inicializa el BehaviorSubject basado en el token existente
    this.isAuthenticatedSource.next(!!this.getToken());
    // Inicializa los nombres y apellidos desde el token si el usuario está autenticado
    if (this.isAuthenticatedSource.value) {
      this.initNamesAndLastnames();
    }
  }

  setToken(token: string | null): void {
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('token', token);
        // Cuando se establece el token, también inicializa los nombres y apellidos
        this.initNamesAndLastnames();
      } else {
        localStorage.removeItem('token');
        // Cuando se elimina el token, también establece nombres y apellidos como nulos
        this.idAdmin.next(null);
        this.nombres.next(null);
        this.apellidos.next(null);
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

  // Método para verificar la expiración del token
  isTokenExpired(token: string | null): boolean {
    if (!token) {
      return true; // El token no existe, considerarlo como expirado
    }

    const tokenData = JSON.parse(atob(token.split('.')[1])); // Decodificar el payload del token
    const tokenExpiration = tokenData.exp * 1000; // Convertir la expiración a milisegundos

    return Date.now() > tokenExpiration; // Verificar si la fecha actual es posterior a la expiración
  }

  // Método para inicializar nombres y apellidos desde el token
  private initNamesAndLastnames() {
    const token = this.getToken();
    if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1])); // Decodificar el payload del token
      // Extraer nombres y apellidos del token y almacenarlos en BehaviorSubject
      this.idAdmin.next(tokenData.id || null);
      this.nombres.next(tokenData.nombres || null);
      this.apellidos.next(tokenData.apellidos || null);
    }
  }

  logout(): void {
    this.setToken(null);
    this.isAuthenticatedSource.next(!!this.getToken());
    this._router.navigate(['']);
  }

  getIdAdmin(): Observable<number | null> {
    return this.idAdmin.asObservable();
  }

  getNombres(): Observable<string | null> {
    return this.nombres.asObservable();
  }

  getApellidos(): Observable<string | null> {
    return this.apellidos.asObservable();
  }
}
