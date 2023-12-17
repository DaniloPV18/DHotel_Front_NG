import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PaysService } from '../../../../services/pays.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PayHistoricComponent } from '../pay-historic/pay-historic.component';

@Component({
  selector: 'app-pay-details',
  templateUrl: './pay-details.component.html',
  styleUrl: './pay-details.component.css'
})
export class PayDetailsComponent {
  constructor(
    private _payService: PaysService,
    private _dialogRef: MatDialogRef<PayDetailsComponent>,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  formModify = new FormGroup({
    id: new FormControl(this.data.dataModal.id, Validators.required),
    encargado: new FormControl(this.data.dataModal.personal_registro, Validators.required),
    huesped: new FormControl(this.data.dataModal.huesped, Validators.required),
    habitacion: new FormControl(this.data.dataModal.id_habitacion, Validators.required),
    tipo_pago: new FormControl(this.data.dataModal.id_tipo_pago === 1 ? "Directo" : "Reserva"),
    valor_pagado: new FormControl(this.data.dataModal.valor_a_pagar, Validators.required),
    fecha_inicio: new FormControl(this.data.dataModal.fecha_inicio, Validators.required),
    fecha_fin: new FormControl(this.data.dataModal.fecha_fin, Validators.required),
    fecha_registro: new FormControl(this.data.dataModal.fecha_registro, Validators.required),
  });

  seeHistoric() {
    var text = "HISTORIAL DE PAGOS DE RESERVAS";
    const dialogRef = this._dialog.open(PayHistoricComponent, {
      width: '80%',
      data: {
        dataModal: this.data.dataModal,
        dataText: text,
        dataStatus: 1
      }
    });
  }

  cancel() {
    this._dialogRef.close();
  }
}
