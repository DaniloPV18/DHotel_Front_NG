import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private nombres: string | null = null;
  private apellidos: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          // Token válido, obtener nombres y apellidos del payload
          const token = this.authService.getToken();
          if (token) {
            const tokenParts = token.split('.');
            if (tokenParts.length === 3) {
              const encodedPayload = tokenParts[1];
              const decodedPayload = JSON.parse(atob(encodedPayload));
              this.nombres = decodedPayload.nombres;
              this.apellidos = decodedPayload.apellidos;
            }
            return true;
          } else {
            this.router.navigate(['']);
            return false;
          }
        } else {
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
