import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaysService } from '../../../../services/pays.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-guest-create',
  templateUrl: './guest-create.component.html',
  styleUrl: './guest-create.component.css'
})
export class GuestCreateComponent {

  constructor(
    private _paysService: PaysService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  formCreate = new FormGroup({
    id: new FormControl('', Validators.required),
    encargado: new FormControl('', Validators.required),
    huesped: new FormControl('', Validators.required),
    habitacion: new FormControl('', Validators.required),
    tipo_pago: new FormControl(this.data.dataStatus),
    valor_pagado: new FormControl('', Validators.required),
    fecha_inicio: new FormControl('', Validators.required),
    fecha_fin: new FormControl('', Validators.required),
    fecha_registro: new FormControl(new Date()),
  });

  save() {
    const formValues = this.formCreate.value;

    // Imprime los valores en la consola
    console.log('Valores del formulario:', formValues);
    //this._paysService.addPay({} as Pays);
  }

}
