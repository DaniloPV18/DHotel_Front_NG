import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GuestsService } from '../../../../services/guests.service';
import { AlertConfirmationService } from '../../../../services/alert-confirmation.service';
import { Guests } from '../../../../interfaces/guests';
import { IdAdminService } from '../../../../services/components/id-admin.service';


@Component({
  selector: 'app-guest-create',
  templateUrl: './guest-create.component.html',
  styleUrl: './guest-create.component.css'
})
export class GuestCreateComponent {

  idAdmin !: number | null;

  formAdd = new FormGroup({
    cedula: new FormControl('', Validators.required),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    celular: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    generoId: new FormControl('', Validators.required),
    administradorId: new FormControl(this.idAdmin),
  });

  constructor(
    private _dialogRef: MatDialogRef<GuestCreateComponent>,
    private _guestsService: GuestsService,
    private _alertService: AlertConfirmationService,
    private _idAdminService: IdAdminService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idAdmin = this._idAdminService.getIdAdmin();
  }

  onSubmit() {
    this._guestsService.add({
      cedula: this.formAdd.value.cedula,
      nombres: this.formAdd.value.nombres,
      apellidos: this.formAdd.value.apellidos,
      celular: this.formAdd.value.celular,
      email: this.formAdd.value.email,
      generoId: this.formAdd.value.generoId,
      administradorId: this.idAdmin,
    } as Guests).subscribe((response) => {
      this._alertService.showSuccessAlert('Huésped agregado con éxito', 1).then((result) => {
        if (result.isConfirmed) {
          this._dialogRef.close({ isConfirmed: true, data: response });
        }
      });
    },
      (error) => {
        console.log(error);
        this._alertService.showSuccessAlert('Ha ocurrido un error.', 2).then(() => {
        });
      }
    );
  }

  cancel() {
    this._dialogRef.close();
  }

}
