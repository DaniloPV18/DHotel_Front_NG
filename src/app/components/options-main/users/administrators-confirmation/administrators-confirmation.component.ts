import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdministratorsService } from '../../../../services/administrators.service';
import { Administrators } from '../../../../interfaces/administrators';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
    private _router: Router,
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
          this._router.navigate(['/administrators']);
        },
        (error) => {
          console.error('Error al actualizar el administrador', error);
        }
      );
    this._dialogRef.close();
  }

  cancel() {
    this._dialogRef.close();
  }
}
