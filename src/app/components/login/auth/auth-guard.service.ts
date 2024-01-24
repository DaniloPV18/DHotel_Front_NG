import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertConfirmationService } from '../../../services/alert-confirmation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private nombres: string | null = null;
  private apellidos: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _alertService: AlertConfirmationService
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          const token = this.authService.getToken();
          if (token && !this.authService.isTokenExpired(token) && this.authService.isJwtTokenValid(token)) {
            const tokenParts = token.split('.');
            if (tokenParts.length === 3) {
              const encodedPayload = tokenParts[1];
              const decodedPayload = JSON.parse(atob(encodedPayload));
              this.nombres = decodedPayload.nombres;
              this.apellidos = decodedPayload.apellidos;
            }
            return true;
          } else {
            this._alertService.showSuccessAlert('Su sesión ha finalizado!', 2);
            this.router.navigate(['']);
            return false;
          }
        } else {
          this._alertService.showSuccessAlert('No se encuentra autenticado!', 2);
          this.router.navigate(['']);
          return false;
        }
      })
    );
  }

  // Método para obtener los nombres y apellidos
  getNombres(): string | null {
    return this.nombres;
  }

  getApellidos(): string | null {
    return this.apellidos;
  }
}
