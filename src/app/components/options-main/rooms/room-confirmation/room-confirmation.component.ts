import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomsService } from '../../../../services/rooms.service';
import { AlertConfirmationService } from '../../../../services/alert-confirmation.service';
import { Subscription } from 'rxjs';
import { Rooms } from '../../../../interfaces/rooms';

@Component({
  selector: 'app-room-confirmation',
  templateUrl: './room-confirmation.component.html',
  styleUrl: './room-confirmation.component.css'
})
export class RoomConfirmationComponent {

  private roomsSubscription: Subscription;

  constructor(
    private _dialogRef: MatDialogRef<RoomConfirmationComponent>,
    private _roomsService: RoomsService,
    private _alertService: AlertConfirmationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.roomsSubscription = new Subscription();
  }

  ngOnDestroy() {
    if (this.roomsSubscription) {
      this.roomsSubscription.unsubscribe();
    }
  }

  onSubmit() {
    this.roomsSubscription = this._roomsService.changeStatus(this.data.dataModal as Rooms, this.data.dataStatus as number)
    .subscribe(
      (response) => {
        this._alertService.showSuccessAlert('Estado actualizado con éxito', 1)
          .then((result) => {
            if (result.isConfirmed) { this._dialogRef.close('updated'); }
          });
      },
        (error) => {
          console.log(error);
          this._alertService.showSuccessAlert('Ha Ocurrido un error.!', 2)
          .then((result) => {          
          });
        }
    );
  }

  cancel() {
    this._dialogRef.close();
  }
}
