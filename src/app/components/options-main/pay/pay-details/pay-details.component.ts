import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaysService } from '../../../../services/pays.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pay-details',
  templateUrl: './pay-details.component.html',
  styleUrl: './pay-details.component.css'
})
export class PayDetailsComponent {
  constructor(
    private _payService: PaysService,
    private _dialogRef: MatDialogRef<PayDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  formModify = new FormGroup({
    cedula: new FormControl(this.data.dataModal.id_huesped, Validators.required),
    nombres: new FormControl(this.data.dataModal.nombres, Validators.required),
    apellidos: new FormControl(this.data.dataModal.apellidos, Validators.required),
    celular: new FormControl(this.data.dataModal.celular), // Puedes agregar más campos según sea necesario
    correo: new FormControl(this.data.dataModal.correo, Validators.required),
    id_genero: new FormControl(this.data.dataModal.id_genero), // Asegúrate de manejar los campos numéricos según tus necesidades
    pwd: new FormControl(this.data.dataModal.pwd),
    fecha_nacimiento: new FormControl(new Date()),
    id_rol: new FormControl(this.data.dataModal.id_rol),
    id_personal_registro: new FormControl(1),
    id_estado: new FormControl(this.data.dataModal.id_estado),
    fecha_modificacion: new FormControl(new Date()),
  });

  onSubmit() {

  }

  cancel() {

  }
}
