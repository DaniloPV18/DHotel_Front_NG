import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../components/login/auth/auth.service';
import { AlertConfirmationService } from '../../services/alert-confirmation.service';
import { Subscription } from 'rxjs';
import { AuthGuard } from '../../components/login/auth/auth-guard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnDestroy {
  isLoggedIn: boolean = false;

  private authSubscription: Subscription;
  private nombresSubscription!: Subscription;
  private apellidosSubscription!: Subscription;

  idAdmin: number | null = null;
  nombres: string | null = null;
  apellidos: string | null = null;

  constructor(private authService: AuthService, private authGuard: AuthGuard) {
    this.authSubscription = this.authService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isLoggedIn = authenticated;        
        this.nombresSubscription = this.authService.getNombres().subscribe(
          (nombres) => {
            this.nombres = nombres;
          }
        );
        this.apellidosSubscription = this.authService.getApellidos().subscribe(
          (apellidos) => {
            this.apellidos = apellidos;
          }
        );
      }
    );
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.nombresSubscription.unsubscribe();
    this.apellidosSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}