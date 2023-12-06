import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Users } from '../../../../interfaces/users';

@Component({
  selector: 'app-users-update',
  templateUrl: './users-update.component.html',
  styleUrl: './users-update.component.css'
})

export class UsersUpdateComponent {

  constructor(
    private _dialogRef: MatDialogRef<UsersUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
  }

  formModify = new FormGroup({
    cedula: new FormControl('', Validators.required),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required)
  });

  onSubmit() {

  }

  cancel() {
    this._dialogRef.close();
  }
}
