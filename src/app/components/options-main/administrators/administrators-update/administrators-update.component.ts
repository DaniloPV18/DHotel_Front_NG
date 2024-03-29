import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdministratorsUpdate } from '../../../../interfaces/administrators';
import { AdministratorsService } from '../../../../services/administrators.service';
import { AlertConfirmationService } from '../../../../services/alert-confirmation.service';
import { IdAdminService } from '../../../../services/components/id-admin.service';

@Component({
  selector: 'app-administrators-update',
  templateUrl: './administrators-update.component.html',
  styleUrl: './administrators-update.component.css'
})

export class AdministratorsUpdateComponent {

  idAdmin !: number | null;

  constructor(
    private _dialogRef: MatDialogRef<AdministratorsUpdateComponent>,
    private _administratorsService: AdministratorsService,
    private _alertService: AlertConfirmationService,
    private _idAdminService: IdAdminService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idAdmin = this._idAdminService.getIdAdmin();
  }

  formModify = new FormGroup({
    cedula: new FormControl(this.data.dataModal.cedula, Validators.required),
    nombres: new FormControl(this.data.dataModal.nombres, Validators.required),
    apellidos: new FormControl(this.data.dataModal.apellidos, Validators.required),
    celular: new FormControl(this.data.dataModal.celular), // Puedes agregar más campos según sea necesario
    email: new FormControl(this.data.dataModal.email, Validators.required),
    generoId: new FormControl(this.data.dataModal.generoId), // Asegúrate de manejar los campos numéricos según tus necesidades
    pwd: new FormControl(this.data.dataModal.pwd),
    fechaNacimiento: new FormControl(new Date()),
    rolId: new FormControl(this.data.dataModal.rolId),
    administradorId: new FormControl(this.idAdmin),
    estadoId: new FormControl(this.data.dataModal.estadoId)
  });

  onSubmit() {
    this._administratorsService.update({
      id: this.data.dataModal.id,
      cedula: this.formModify.value.cedula ?? this.data.dataModal.cedula,
      nombres: this.formModify.value.nombres ?? this.data.dataModal.nombres,
      apellidos: this.formModify.value.apellidos ?? this.data.dataModal.apellidos,
      celular: this.formModify.value.celular ?? this.data.dataModal.celular,
      email: this.formModify.value.email ?? this.data.dataModal.email,
      generoId: this.formModify.value.generoId ?? this.data.dataModal.generoId,
      fechaNacimiento: this.formModify.value.fechaNacimiento ?? this.data.dataModal.fechaNacimiento,
      rolId: this.formModify.value.rolId ?? this.data.dataModal.rolId,
      administradorId: this.idAdmin ?? this.data.dataModal.administradorId,
      estadoId: this.formModify.value.estadoId ?? this.data.dataModal.estadoId,
      fechaModificacion: new Date().toISOString()
    } as AdministratorsUpdate).subscribe((response) => {
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
