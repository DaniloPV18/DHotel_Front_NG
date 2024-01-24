import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdministratorsService } from '../../../../services/administrators.service';
import { AdministratorsCreate } from '../../../../interfaces/administrators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertConfirmationService } from '../../../../services/alert-confirmation.service';
import { IdAdminService } from '../../../../services/components/id-admin.service';

@Component({
  selector: 'app-administrators-create',
  templateUrl: './administrators-create.component.html',
  styleUrl: './administrators-create.component.css'
})
export class AdministratorsCreateComponent {

  idAdmin !: number | null;

  formAdd = new FormGroup({
    cedula: new FormControl('', Validators.required),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    celular: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    generoId: new FormControl('', Validators.required),
    rolId: new FormControl('', Validators.required),
    pwd: new FormControl(''),
    fechaNacimiento: new FormControl('', Validators.required),
    administradorId: new FormControl(this.idAdmin)
  });

  constructor(
    private _dialogRef: MatDialogRef<AdministratorsCreateComponent>,
    private _administratorsService: AdministratorsService,
    private _alertService: AlertConfirmationService,
    private _idAdminService: IdAdminService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idAdmin = this._idAdminService.getIdAdmin();
  }

  onSubmit() {
    this._administratorsService.add({
      cedula: this.formAdd.value.cedula,
      nombres: this.formAdd.value.nombres,
      apellidos: this.formAdd.value.apellidos,
      celular: this.formAdd.value.celular,
      email: this.formAdd.value.email,
      generoId: this.formAdd.value.generoId,
      rolId: this.formAdd.value.rolId,
      fechaNacimiento: this.formAdd.value.fechaNacimiento,
      administradorId: this.idAdmin
    } as AdministratorsCreate).subscribe((response) => {
      this._alertService.showSuccessAlert('Administrador agregado con éxito', 1)
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
    );
  }

  cancel() {
    this._dialogRef.close();
  }
}
