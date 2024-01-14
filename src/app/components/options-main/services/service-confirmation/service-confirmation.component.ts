import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from '../../../../services/service.service';
import { AlertConfirmationService } from '../../../../services/alert-confirmation.service';
import { Subscription } from 'rxjs';
import { Service } from '../../../../interfaces/service';
@Component({
  selector: 'app-service-confirmation',
  templateUrl: './service-confirmation.component.html',
  styleUrl: './service-confirmation.component.css'
})
export class ServiceConfirmationComponent {

  private serviceSubscription: Subscription;

  constructor(
    private _dialogRef: MatDialogRef<ServiceConfirmationComponent>,
    private _servicesServices: ServiceService,
    private _alertService: AlertConfirmationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.serviceSubscription = new Subscription();
  }

  ngOnDestroy() {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }

  onSubmit() {
    this.serviceSubscription = this._servicesServices.changeStatus(this.data.dataModal as Service, this.data.dataStatus as number)
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
