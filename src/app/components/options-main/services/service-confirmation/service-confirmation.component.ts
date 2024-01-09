import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-service-confirmation',
  templateUrl: './service-confirmation.component.html',
  styleUrl: './service-confirmation.component.css'
})
export class ServiceConfirmationComponent {

  constructor(
    private _dialogRef: MatDialogRef<ServiceConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onSubmit() {

  }

  cancel() {
    this._dialogRef.close();
  }

}
