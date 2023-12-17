import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pay-confirmation',
  templateUrl: './pay-confirmation.component.html',
  styleUrl: './pay-confirmation.component.css'
})
export class PayConfirmationComponent {
  constructor(
    private _dialogRef: MatDialogRef<PayConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onSubmit() {

  }

  cancel() {
    this._dialogRef.close();
  }
}
