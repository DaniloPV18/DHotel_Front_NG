import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PaysService } from '../../../../services/pays.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PayHistoricComponent } from '../pay-historic/pay-historic.component';
import { PipesDatePipe } from '../../../../pipes/pipes-date.pipe';
import { environment } from '../../../../../environments/environment';
import { RoomsService } from '../../../../services/rooms.service';
import { PaysUpdate } from '../../../../interfaces/pays';
import { AlertConfirmationService } from '../../../../services/alert-confirmation.service';

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

  fechaAnteriorInicio!: string;
  fechaAnteriorFin!: string;

  foto!: string;

  estado!: string;

  baseUrl: string = `${environment.endpoint}ImagesGlobal`;

  habitacionesCombo: any[] = [];

  habitaciones: any[] = [];

  dias: number = 0;
  total: number = 0;
  precioHabitacion: number = 0;

  existeFechaNueva: boolean = false;

  servicios_habitacion!: any;

  valorPendiente: number = 0;

  textoModal_1: string = 'Valor pagado:';

  constructor(
    private _paysService: PaysService,
    private _roomsService: RoomsService,
    private _cdr: ChangeDetectorRef,
    private _dialogRef: MatDialogRef<PayDetailsComponent>,
    private _pipesDate: PipesDatePipe,
    private _alertService: AlertConfirmationService,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.nombreHuesped = this.data.dataModal.huesped.nombres + " " + this.data.dataModal.huesped.apellidos;
    this.nombreAdministrador = this.data.dataModal.administrador.nombres + " " + this.data.dataModal.administrador.apellidos;
    this.fechaInicioPipe = this._pipesDate.transform(this.data.dataModal.fechaInicio, 'days');
    this.fechaFinPipe = this._pipesDate.transform(this.data.dataModal.fechaFin, 'days');
    this.fechaRegistroPipe = this._pipesDate.transform(this.data.dataModal.fechaRegistro, 'seconds');
    this.estado = this.obtenerEstado(this.data.dataModal.estadoId);
    this.foto = this.baseUrl + "/" + this.data.dataModal.habitacion.foto;
    this.precioHabitacion = this.data.dataModal.habitacion.precio;
    this.fechaAnteriorInicio = this.data.dataModal.fechaInicio;
    this.fechaAnteriorFin = this.data.dataModal.fechaFin;
    this.startFormModify();
  }

  ngOnInit() {
    this.loadRooms();
    this.eventRoomsImage();
    this.eventDateRange();
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
    this.valorPendiente = 0;
    var valorPagado: number = 0;
    if (this.data.dataStatus == 1) {
      valorPagado = this.data.dataModal.valorPagado
    } else if (this.data.dataStatus == 2) {
      valorPagado = this.data.dataModal.valorAPagar
      if (this.data.dataModal.valorAPagar != this.data.dataModal.valorPagado) {
        this.textoModal_1 = 'Total a pagar: ';
        this.valorPendiente = this.data.dataModal.valorAPagar - this.data.dataModal.valorPagado;
      }
    }
    this.formModify = new FormGroup({
      id: new FormControl(this.data.dataModal.id, Validators.required),
      encargado: new FormControl(this.nombreAdministrador, Validators.required),
      huesped: new FormControl(this.nombreHuesped, Validators.required),
      habitacion: new FormControl(this.data.dataModal.habitacion.id, Validators.required),
      tipo_pago: new FormControl(this.data.dataModal.tipoPagoId === 1 ? "Directo" : "Reserva"),
      valor_pagado: new FormControl(valorPagado, Validators.required),
      fecha_inicio: new FormControl(this.data.dataModal.fechaInicio, Validators.required),
      fecha_fin: new FormControl(this.data.dataModal.fechaFin, Validators.required),
      fecha_registro: new FormControl(this.fechaRegistroPipe, Validators.required),
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
    this._paysService.update({
      id: this.data.dataModal.id,
      habitacionId: this.formModify.value.habitacion,
      administradorId: 1,
      huespedId: this.data.dataModal.huesped.id,
      tipoPagoId: this.data.dataModal.tipoPagoId,
      valorPagado: this.precioHabitacion,
      valorAPagar: this.precioHabitacion,
      serviciosHabitacion: this.servicios_habitacion ?? this.data.dataModal.serviciosHabitacion,
      fechaInicio: this.formModify.value.fecha_inicio,
      fechaFin: this.formModify.value.fecha_fin,
      estadoId: this.data.dataModal.estadoId
    } as PaysUpdate).subscribe((response) => {
      this._alertService.showSuccessAlert('Pago actualizada con éxito', 1)
        .then((result) => {
          if (result.isConfirmed) { this._dialogRef.close('updated'); }
        });
    },
      (error) => {
        console.log(error);
        this._alertService.showSuccessAlert('Ha Ocurrido un error.!', 2);
      }
    );
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
      this.loadRoomServicesModal();
    });
  }

  loadRoomServicesModal() {
    this.servicios_habitacion = '';
    const habitacionSeleccionada = this.habitaciones.find(habitacion => habitacion.id === this.data.dataModal.habitacion.id);
    habitacionSeleccionada.habitacionServicioOfrecido.forEach((element: any, index: number) => {
      if (element.servicioOfrecido && element.servicioOfrecido.nombre) {
        this.servicios_habitacion += element.servicioOfrecido.nombre + ",";
      }
    });
    if (this.servicios_habitacion.endsWith(",")) {
      this.servicios_habitacion = this.servicios_habitacion.slice(0, -1);
    }
  }

  eventRoomsImage() {
    this.servicios_habitacion = '';
    this.formModify.get('habitacion')!.valueChanges.subscribe(valorSeleccionado => {
      const habitacionSeleccionada = this.habitaciones.find(habitacion => habitacion.id === valorSeleccionado);
      if (habitacionSeleccionada && habitacionSeleccionada.foto) {
        this.foto = this.baseUrl + "/" + habitacionSeleccionada.foto;
        this.precioHabitacion = habitacionSeleccionada.precio;
        this.formModify.patchValue({
          valor_pagado: habitacionSeleccionada.precio
        });
        this.loadRoomServicesModal();
        this._cdr.detectChanges();
      } else {
        this.foto = '';
      }
    });
  }

  eventDateRange() {
    this.formModify.get('fecha_inicio')!.valueChanges.subscribe(() => {
      this.onDateRangeChange();
      this.getAvailable();
    });
    this.formModify.get('fecha_fin')!.valueChanges.subscribe(() => {
      this.onDateRangeChange();
      this.getAvailable();
    });
  }

  onDateRangeChange() {
    this.dias = this.getDaysRange();
    this.total = this.precioHabitacion * this.dias;
    this.formModify.patchValue({
      valor_pagado: this.total
    });
  }

  getDaysRange() {
    try {
      const fechaInicio = this.formModify.get('fecha_inicio')!.value;
      const fechaFin = this.formModify.get('fecha_fin')!.value;
      if (fechaInicio && fechaFin) {
        const diferenciaTiempo = fechaFin.getTime() - fechaInicio.getTime();
        const dias = diferenciaTiempo / (1000 * 3600 * 24);
        this.existeFechaNueva = true;
        return Math.round(dias); // Redondea al número entero más cercano
      }
    } catch (error) {
    }
    return 0;
  }

  isValidDateFormat(dateString: string): boolean {
    // Primero, verifica si la cadena es una fecha válida
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return false; // No es una fecha válida
    }
    const regex = /^[MonTueWedThuFriSatSun]{3} [JanFebMarAprMayJunJulAugSepOctNovDec]{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT[+-]\d{4}$/;
    return regex.test(dateString);
  }

  getAvailable() {
    const fechaInicio = this.formModify.get('fecha_inicio')!.value;
    const fechaFin = this.formModify.get('fecha_fin')!.value;
    const idHabitacion = this.formModify.get('habitacion')!.value;
    if (fechaInicio && fechaFin && idHabitacion) {
      this._paysService.getAvailablePay({
        habitacionId: idHabitacion,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin
      } as PaysUpdate).subscribe((response) => {
        if (response && response.length > 0) {
          var fechasOcupadas = this.getDatesNotAvailable(response);
          this._alertService.showSuccessAlert(`<div>Se encuentra ocupado durante ese rango de días:<br>${fechasOcupadas}</div>`, 2);
          this.formModify.patchValue({
            fecha_inicio: null,
            fecha_fin: null
          });
        }
      },
        (error) => {
          console.log(error);
          this._alertService.showSuccessAlert('Ha Ocurrido un error.!', 2);
        }
      );
    }
  }

  getDatesNotAvailable(response: any): string {
    var fechasOcupadas: string = '';
    response.forEach((element: any) => {
      fechasOcupadas +=
        `<li style="text-align:left"> 
          Fecha Inicio: ${this._pipesDate.transform(element.fechaInicio, 'days')} 
        - Fecha Fin: ${this._pipesDate.transform(element.fechaFin, 'days')}
        </li>`
    });
    return `<ol>${fechasOcupadas}</ol>`;
  }
}
