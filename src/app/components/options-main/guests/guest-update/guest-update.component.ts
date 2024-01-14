import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GuestsService } from '../../../../services/guests.service';
import { AlertConfirmationService } from '../../../../services/alert-confirmation.service';
import { Guests } from '../../../../interfaces/guests';

@Component({
  selector: 'app-guest-update',
  templateUrl: './guest-update.component.html',
  styleUrl: './guest-update.component.css'
})
export class GuestUpdateComponent {

  constructor(
    private _dialogRef: MatDialogRef<GuestUpdateComponent>,
    private _guestsService : GuestsService,
    private _alertService : AlertConfirmationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  formModify = new FormGroup({
    cedula: new FormControl(this.data.dataModal.cedula, Validators.required),
    nombres: new FormControl(this.data.dataModal.nombres, Validators.required),
    apellidos: new FormControl(this.data.dataModal.apellidos, Validators.required),
    celular: new FormControl(this.data.dataModal.celular, Validators.required),
    email: new FormControl(this.data.dataModal.email, Validators.required),
    generoId: new FormControl(this.data.dataModal.generoId),
    administradorId: new FormControl(1),
  });

  onSubmit(){
    this._guestsService.update({
      id: this.data.dataModal.id,
      cedula: this.formModify.value.cedula ?? this.data.dataModal.cedula,
      nombres: this.formModify.value.nombres ?? this.data.dataModal.nombres,
      apellidos: this.formModify.value.apellidos ?? this.data.dataModal.apellidos,
      celular: this.formModify.value.celular ?? this.data.dataModal.celular,
      email: this.formModify.value.email ?? this.data.dataModal.email,
      generoId: this.formModify.value.generoId ?? this.data.dataModal.generoId,
      administradorId: this.formModify.value.administradorId ?? this.data.dataModal.administradorId,
      fechaModificacion: new Date().toISOString()
    } as Guests).subscribe((response) => {
      this._alertService.showSuccessAlert('Huesped actualizado con éxito', 1)
        .then((result) => {
          if (result.isConfirmed) { this._dialogRef.close('updated'); }
        });
    },
      (error) => {
        console.log(error);
        this._alertService.showSuccessAlert('Ha Ocurrido un error.!', 2)
        .then((result) => {          
        });
      }
    );;
  }
  
  cancel(){
    this._dialogRef.close();
  }

}
