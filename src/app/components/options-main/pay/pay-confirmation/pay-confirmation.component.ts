import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PaysService } from '../../../../services/pays.service';
import { Pays } from '../../../../interfaces/pays';
import { AlertConfirmationService } from '../../../../services/alert-confirmation.service';
import { ReservesService } from '../../../../services/reserves.service';
import { Reserve, ReserveUpdate } from '../../../../interfaces/reserve';

@Component({
  selector: 'app-pay-confirmation',
  templateUrl: './pay-confirmation.component.html',
  styleUrl: './pay-confirmation.component.css'
})
export class PayConfirmationComponent {

  private paysSubscription: Subscription;
  private reserveSubscription: Subscription;

  constructor(
    private _dialogRef: MatDialogRef<PayConfirmationComponent>,
    private _paysService: PaysService,
    private _reservesService: ReservesService,
    private _alertService: AlertConfirmationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.paysSubscription = new Subscription();
    this.reserveSubscription = new Subscription();
  }

  ngOnDestroy() {
    if (this.paysSubscription) {
      this.paysSubscription.unsubscribe();
    }
    if (this.reserveSubscription) {
      this.reserveSubscription.unsubscribe();
    }
  }

  onSubmit() {
    if (this.data.dataPayModal.tipoPagoId == 1) {
      this.paysSubscription = this._paysService.changeStatus(this.data.dataPayModal as Pays)
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
    } else if (this.data.dataPayModal.tipoPagoId == 2) {
      var reserva: ReserveUpdate = this.data.dataReserveModal;
      reserva.pagoId = this.data.dataPayModal.id;
      this.paysSubscription = this._reservesService.changeStatus(reserva,
        this.data.dataStatus)
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

  }

  cancel() {
    this._dialogRef.close();
  }
}
