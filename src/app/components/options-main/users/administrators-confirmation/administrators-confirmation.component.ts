import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-administrators-confirmation',
  templateUrl: './administrators-confirmation.component.html',
  styleUrl: './administrators-confirmation.component.css'
})
export class AdministratorsConfirmationComponent {
  constructor(
    private _dialogRef: MatDialogRef<AdministratorsConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onSubmit() {

  }

  cancel() {
    this._dialogRef.close();
  }
}
