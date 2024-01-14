import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdministratorsService } from '../../../../services/administrators.service';
import { Administrators } from '../../../../interfaces/administrators';
import { Subscription } from 'rxjs';
import { AlertConfirmationService } from '../../../../services/alert-confirmation.service';

@Component({
  selector: 'app-administrators-confirmation',
  templateUrl: './administrators-confirmation.component.html',
  styleUrl: './administrators-confirmation.component.css'
})
export class AdministratorsConfirmationComponent {

  private administradorSubscription: Subscription;


  constructor(
    private _dialogRef: MatDialogRef<AdministratorsConfirmationComponent>,
    private _administratorsService: AdministratorsService,
    private _alertService: AlertConfirmationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.administradorSubscription = new Subscription();
  }

  ngOnDestroy() {
    if (this.administradorSubscription) {
      this.administradorSubscription.unsubscribe();
    }
  }

  onSubmit() {
    this.administradorSubscription = this._administratorsService.changeStatus(this.data.dataModal as Administrators, this.data.dataStatus as number)
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
