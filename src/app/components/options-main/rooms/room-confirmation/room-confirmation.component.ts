import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-room-confirmation',
  templateUrl: './room-confirmation.component.html',
  styleUrl: './room-confirmation.component.css'
})
export class RoomConfirmationComponent {

  constructor(
    private _dialogRef: MatDialogRef<RoomConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onSubmit() {

  }

  cancel() {
    this._dialogRef.close();
  }
}
