import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../../../../services/service.service';
import { AlertConfirmationService } from '../../../../services/alert-confirmation.service';
import { Service } from '../../../../interfaces/service';
import { IdAdminService } from '../../../../services/components/id-admin.service';

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrl: './service-create.component.css'
})
export class ServiceCreateComponent {

  idAdmin !: number | null;

  formAdd = new FormGroup({
    codigo: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required)
  });

  constructor(
    private _dialogRef: MatDialogRef<ServiceCreateComponent>,
    private _servicesService: ServiceService,
    private _alertService: AlertConfirmationService,
    private _idAdminService: IdAdminService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idAdmin = this._idAdminService.getIdAdmin();
  }

  onSubmit() {
    this._servicesService.add({
      codigo: this.formAdd.value.codigo,
      nombre: this.formAdd.value.nombre,
    } as Service).subscribe((response) => {
      this._alertService.showSuccessAlert('Servicio agregado con éxito', 1)
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

  cancel() {
    this._dialogRef.close();
  }
}
