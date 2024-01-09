import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
/* import { Users } from '../../../../interfaces/users';
import { UsersService } from '../../../../services/users.service';
import { UsersUpdateComponent } from '../../users/users-update/users-update.component'; */

@Component({
  selector: 'app-room-update',
  templateUrl: './room-update.component.html',
  styleUrl: './room-update.component.css'
})
export class RoomUpdateComponent {
  /* user: Users = {}; */

  constructor(
    /* private _dialogRef: MatDialogRef<UsersUpdateComponent>,
    private _usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any */
  ) {
  }

  /* formModify = new FormGroup({
    cedula: new FormControl(this.data.dataModal.cedula, Validators.required),
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
    this._usersService.updateUser({
      id: this.data.dataModal.id,
      cedula: this.formModify.value.cedula ?? this.data.dataModal.cedula,
      nombres: this.formModify.value.nombres ?? this.data.dataModal.nombres,
      apellidos: this.formModify.value.apellidos ?? this.data.dataModal.apellidos,
      celular: this.formModify.value.celular ?? this.data.dataModal.celular,
      correo: this.formModify.value.correo ?? this.data.dataModal.correo,
      id_genero: this.formModify.value.id_genero !== undefined ? parseInt(this.formModify.value.id_genero, 10) : null,
      pwd: this.formModify.value.pwd ?? this.data.dataModal.pwd,
      fecha_nacimiento: this.formModify.value.fecha_nacimiento ?? this.data.dataModal.fecha_nacimiento,
      id_rol: this.formModify.value.id_rol ?? undefined,
      id_personal_registro: this.formModify.value.id_personal_registro ?? this.data.dataModal.id_personal_registro,
      id_estado: this.formModify.value.id_estado ?? undefined,
      fecha_modificacion: this.formModify.value.fecha_modificacion ?? this.data.dataModal.fecha_modificacion,
    } as Users);
  }

  cancel() {
    this._dialogRef.close();
  } */
}
