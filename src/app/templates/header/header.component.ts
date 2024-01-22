import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../components/login/auth/auth.service';
import { AlertConfirmationService } from '../../services/alert-confirmation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnDestroy {
  isLoggedIn: boolean = false;
  private authSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.authSubscription = this.authService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isLoggedIn = authenticated;
      }
    );
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}