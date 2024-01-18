import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrl: './room-view.component.css'
})
export class RoomViewComponent {

  constructor(
    private _dialogRef: MatDialogRef<RoomViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.data = data;
  }
}
