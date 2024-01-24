import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaysService } from '../../../../services/pays.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertConfirmationService } from '../../../../services/alert-confirmation.service';
import { ServiceService } from '../../../../services/service.service';
import { ServiceUpdate } from '../../../../interfaces/service';
import { IdAdminService } from '../../../../services/components/id-admin.service';

@Component({
  selector: 'app-service-update',
  templateUrl: './service-update.component.html',
  styleUrl: './service-update.component.css'
})
export class ServiceUpdateComponent {

  idAdmin !: number | null;

  constructor(
    private _dialogRef: MatDialogRef<ServiceUpdateComponent>,
    private _servicesService: ServiceService,
    private _alertService: AlertConfirmationService,
    private _idAdminService: IdAdminService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idAdmin = this._idAdminService.getIdAdmin();
  }

  formModify = new FormGroup({
    codigo: new FormControl(this.data.dataModal.codigo, Validators.required),
    nombre: new FormControl(this.data.dataModal.nombre, Validators.required)
  });

  onSubmit() {
    this._servicesService.update({
      id: this.data.dataModal.id,
      codigo: this.formModify.value.codigo ?? this.data.dataModal.codigo,
      nombre: this.formModify.value.nombre ?? this.data.dataModal.nombre,
      administradorId: this.idAdmin,
      estadoId: this.data.dataModal.estadoId,
      fechaModificacion: new Date().toISOString()
    } as ServiceUpdate).subscribe((response) => {
      this._alertService.showSuccessAlert('Administrador actualizado con éxito', 1)
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
