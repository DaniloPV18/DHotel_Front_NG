import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-users-delete',
  templateUrl: './users-delete.component.html',
  styleUrl: './users-delete.component.css'
})
export class UsersDeleteComponent {
  constructor(
    private _dialogRef: MatDialogRef<UsersDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onSubmit() {

  }

  cancel() {
    this._dialogRef.close();
  }
}
