import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-users-confirmation',
  templateUrl: './users-confirmation.component.html',
  styleUrl: './users-confirmation.component.css'
})
export class UsersConfirmationComponent {
  constructor(
    private _dialogRef: MatDialogRef<UsersConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onSubmit() {

  }

  cancel() {
    this._dialogRef.close();
  }
}
