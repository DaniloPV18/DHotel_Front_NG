import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenLogin = this.authService.getToken();
    if (tokenLogin) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${tokenLogin}`
        }
      });
    }

    return next.handle(request);
  }
}