import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-guest-confirmation',
  templateUrl: './guest-confirmation.component.html',
  styleUrl: './guest-confirmation.component.css'
})
export class GuestConfirmationComponent {

  constructor(
    private _dialogRef: MatDialogRef<GuestConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onSubmit() {

  }

  cancel() {
    this._dialogRef.close();
  }

}
