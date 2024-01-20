import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PaysService } from '../../../../services/pays.service';
import { Pays } from '../../../../interfaces/pays';
import { AlertConfirmationService } from '../../../../services/alert-confirmation.service';

@Component({
  selector: 'app-pay-confirmation',
  templateUrl: './pay-confirmation.component.html',
  styleUrl: './pay-confirmation.component.css'
})
export class PayConfirmationComponent {

  private paysSubscription: Subscription;

  constructor(
    private _dialogRef: MatDialogRef<PayConfirmationComponent>,
    private _paysService: PaysService,
    private _alertService: AlertConfirmationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.paysSubscription = new Subscription();
  }

  ngOnDestroy() {
    if (this.paysSubscription) {
      this.paysSubscription.unsubscribe();
    }
  }

  onSubmit() {
    this.paysSubscription = this._paysService.changeStatus(this.data.dataModal as Pays, this.data.dataStatus as number)
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
