import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReservesService } from '../../../../services/reserves.service';
import { AlertConfirmationService } from '../../../../services/alert-confirmation.service';
import { PipesDatePipe } from '../../../../pipes/pipes-date.pipe';
import { ReserveCreate } from '../../../../interfaces/reserve';

@Component({
  selector: 'app-reserve-create',
  templateUrl: './reserve-create.component.html',
  styleUrl: './reserve-create.component.css',
  providers: [PipesDatePipe]
})
export class ReserveCreateComponent {

  formAdd !: FormGroup;

  abono: number = 0;

  total: number = 0;

  valor_pendiente !: number;

  constructor(
    private _dialogRef: MatDialogRef<ReserveCreateComponent>,
    private _reservesService: ReservesService,
    private _alertService: AlertConfirmationService,
    private _pipesDate: PipesDatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit() {
    this.valor_pendiente = this.data.dataPayModal.valorAPagar - this.data.dataPayModal.valorPagado;
    this.startFormAdd();
  }

  private startFormAdd() {
    this.formAdd = new FormGroup({
      valor_abono: new FormControl('', Validators.required)
    });
  }

  getAbono(event: any): void {
    let value = parseInt(event.target.value, 10);
    if (value > this.valor_pendiente) {
      value = this.valor_pendiente;
      event.target.value = value;
    }
    this.abono = value;
  }

  onSubmit() {
    this._reservesService.add({
      administradorId: 1,
      pagoId: this.data.dataPayModal.id,
      valorPagado: this.abono
    } as ReserveCreate).subscribe((r) => {
      this._alertService.showSuccessAlert('Abono registrada con éxito', 1).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },
      (e) => {
        console.log(e);
        this._alertService.showSuccessAlert('Ha Ocurrido un error.!', 2);
      });
  }

  cancel() {
    this._dialogRef.close();
  }

}
