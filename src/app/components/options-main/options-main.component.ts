import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options-main',
  templateUrl: './options-main.component.html',
  styleUrl: './options-main.component.css'
})
export class OptionsMainComponent {

  constructor(private _router: Router) { }

  navegatePersonal() {
    this._router.navigate(['/users']);
  }

  navegateServices() {
    this._router.navigate(['/services']);
  }

  navegateRooms() {
    this._router.navigate(['/rooms']);
  }

  navegateReserves() {
    this._router.navigate(['/reserves']);
  }

  navegateGuests() {
    this._router.navigate(['/guests']);
  }

  navegatePays() {
    this._router.navigate(['/pays']);
  }
}
