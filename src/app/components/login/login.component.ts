import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { LoginService } from '../../services/login.service';
import { UserAuth, UserResponse } from './auth/auth';
import { AlertConfirmationService } from '../../services/alert-confirmation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  submitted: boolean = false;

  userResponse!: UserResponse;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _loginService: LoginService,
    private _alertService: AlertConfirmationService
  ) { }

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      cedula: new FormControl("", Validators.required),
      contrasena: new FormControl("", Validators.required),
    });
  }

  onSubmit() {
    const { cedula, contrasena } = this.loginFormGroup.value;
    this._loginService.get({
      cedula: cedula,
      pwd: contrasena
    } as UserAuth).subscribe(
      (response) => {
        if (response && response.token) {
          this._authService.setToken(response.token);
          localStorage.setItem('token', response.token);
          this._alertService.showSuccessAlert('Inicio de Sesión exitosa!', 1).then((result) => {
            this._router.navigate(['/main']);
          });
        } else {
          this._alertService.showSuccessAlert('Credenciales Incorrectas', 2);
        }
      },
      (error) => {
        if (error.status) {
          this._alertService.showSuccessAlert('Acceso no permitido', 2);
        } else {
          this._alertService.showSuccessAlert('Ha ocurrido un error!', 2);
          console.error(error);
        }
      });
  }

  get loginFormGroupControl() {
    return this.loginFormGroup.controls;
  }
}
