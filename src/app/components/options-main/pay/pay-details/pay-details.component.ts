import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PaysService } from '../../../../services/pays.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PayHistoricComponent } from '../pay-historic/pay-historic.component';
import { PipesDatePipe } from '../../../../pipes/pipes-date.pipe';
import { environment } from '../../../../../environments/environment';
import { RoomsService } from '../../../../services/rooms.service';

@Component({
  selector: 'app-pay-details',
  templateUrl: './pay-details.component.html',
  styleUrl: './pay-details.component.css',
  providers: [PipesDatePipe]
})

export class PayDetailsComponent implements OnInit {

  formModify!: FormGroup;

  nombreHuesped!: string;
  nombreAdministrador!: string;

  fechaInicioPipe!: string;
  fechaFinPipe!: string;
  fechaRegistroPipe!: string;

  foto!: string;

  estado!: string;

  baseUrl: string = `${environment.endpoint}ImagesGlobal`;

  habitacionesCombo: any[] = [];

  habitaciones: any[] = [];

  constructor(
    private _payService: PaysService,
    private _roomsService: RoomsService,
    private _cdr: ChangeDetectorRef,
    private _dialogRef: MatDialogRef<PayDetailsComponent>,
    private _pipesDate: PipesDatePipe,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.nombreHuesped = this.data.dataModal.huesped.nombres + " " + this.data.dataModal.huesped.nombres;
    this.nombreAdministrador = this.data.dataModal.administrador.nombres + " " + this.data.dataModal.administrador.nombres;
    this.fechaInicioPipe = this._pipesDate.transform(this.data.dataModal.fechaInicio, 'days');
    this.fechaFinPipe = this._pipesDate.transform(this.data.dataModal.fechaFin, 'days');
    this.fechaRegistroPipe = this._pipesDate.transform(this.data.dataModal.fechaRegistro, 'seconds');
    this.estado = this.obtenerEstado(this.data.dataModal.estadoId);
    this.foto = this.baseUrl + "/" + this.data.dataModal.habitacion.foto;
    this.startFormModify();
  }

  ngOnInit() {
    this.loadRooms();
    this.eventRoomsImage();
  }

  obtenerEstado(estadoId: number): string {
    switch (estadoId) {
      case 1:
        return "Pagado";
      case 2:
        return "Pendiente";
      case 3:
        return "Anulado";
      default:
        return "Estado desconocido";
    }
  }

  private startFormModify() {
    this.formModify = new FormGroup({
      id: new FormControl(this.data.dataModal.id, Validators.required),
      encargado: new FormControl(this.nombreAdministrador, Validators.required),
      huesped: new FormControl(this.nombreHuesped, Validators.required),
      habitacion: new FormControl(this.data.dataModal.habitacion.id, Validators.required),
      tipo_pago: new FormControl(this.data.dataModal.tipoPagoId === 1 ? "Directo" : "Reserva"),
      valor_pagado: new FormControl(this.data.dataModal.valorPagado, Validators.required),
      fecha_inicio: new FormControl(this.data.dataModal.fechaInicio, Validators.required),
      fecha_fin: new FormControl(this.data.dataModal.fechaFin, Validators.required),
      fecha_registro: new FormControl(this.fechaRegistroPipe, Validators.required),
      rangoFechas: new FormBuilder().group({
        fecha_fin: new FormControl(this.data.dataModal.fechaFin, Validators.required),
        fecha_registro: new FormControl(this.fechaRegistroPipe, Validators.required),
      }),
      estado: new FormControl(this.estado)
    });
    this.disabledForm();
  }

  private disabledForm() {
    if (this.data.dataModal.estadoId === 3) {
      this.formModify.disable();
    }
  }

  seeHistoric() {
    var text = "Historial de Abonos de Reserva";
    this._dialog.open(PayHistoricComponent, {
      width: '80%',
      data: {
        dataModal: this.data.dataModal,
        dataText: text,
        dataStatus: 1
      }
    });
  }

  onSubmit() {

  }

  cancel() {
    this._dialogRef.close();
  }

  loadRooms() {
    this._roomsService.getAllActivates().subscribe(data => {
      this.habitaciones = data;
      this.habitacionesCombo = data.map(item => ({
        valor: item.id,
        vista: item.numero
      }));
    });
  }

  eventRoomsImage() {
    this.formModify.get('habitacion')!.valueChanges.subscribe(valorSeleccionado => {
      const habitacionSeleccionada = this.habitaciones.find(habitacion => habitacion.id === valorSeleccionado);
      if (habitacionSeleccionada && habitacionSeleccionada.foto) {
        this.foto = this.baseUrl + "/" + habitacionSeleccionada.foto;
        this._cdr.detectChanges();
      } else {
        this.foto = '';
      }
    });
  }
}
