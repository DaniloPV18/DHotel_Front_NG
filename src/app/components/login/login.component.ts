import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  submitted: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      email: new FormControl("", Validators.compose([Validators.email, Validators.required])),
      contrasena: new FormControl("", Validators.required),
    });
  }

  onSubmit() {
    this.router.navigate(["/main"]);
  }

  get loginFormGroupControl() {
    return this.loginFormGroup.controls;
  }
}
