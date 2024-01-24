import { Injectable } from '@angular/core';
import { AuthService } from '../../components/login/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IdAdminService {

  private idAdmin: number | null = null;

  constructor(private authService: AuthService) {
    this.authService.getIdAdmin().subscribe((idAdmin) => {
      this.idAdmin = idAdmin;
    });
  }

  getIdAdmin(): number | null {
    return this.idAdmin;
  }
}
