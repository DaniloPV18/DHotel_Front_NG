import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../../../environments/environment';
import { RoomsService } from '../../../../services/rooms.service';
import { GuestsService } from '../../../../services/guests.service';
import { GuestComponentsService } from '../../../../services/components/guest-create-component.service';
import { AlertConfirmationService } from '../../../../services/alert-confirmation.service';
import { map } from 'rxjs/operators';
import { PaysService } from '../../../../services/pays.service';
import { PaysCreate } from '../../../../interfaces/pays';
import { PipesDatePipe } from '../../../../pipes/pipes-date.pipe';
import { ReservesService } from '../../../../services/reserves.service';
import { ReserveCreate } from '../../../../interfaces/reserve';
import { IdAdminService } from '../../../../services/components/id-admin.service';

@Component({
  selector: 'app-pay-create',
  templateUrl: './pay-create.component.html',
  styleUrl: './pay-create.component.css',
  providers: [PipesDatePipe]
})
export class PayCreateComponent implements OnInit {

  formAdd!: FormGroup;

  huespedExiste: boolean = false;

  nombreHuesped!: string;

  foto!: string;

  estado!: string;

  baseUrl: string = `${environment.endpoint}ImagesGlobal`;

  habitacionesCombo: any[] = [];
  habitaciones: any[] = [];

  huespedes: any[] = [];
  huespedesCombo: any[] = [];

  filtro = '';

  dias: number = 0;
  total: number = 0;

  cedulaValue: string = '';

  huesped_id!: number;

  servicios_habitacion: string = "";

  abono: number = 0;

  idAdmin !: number | null;

  constructor(
    private _dialogRef: MatDialogRef<PayCreateComponent>,
    private _guestComponentService: GuestComponentsService,
    private _roomsService: RoomsService,
    private _reservesService: ReservesService,
    private _guestsService: GuestsService,
    private _alertService: AlertConfirmationService,
    private _paysService: PaysService,
    private _idAdminService: IdAdminService,
    private _pipesDate: PipesDatePipe,
    private _cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idAdmin = this._idAdminService.getIdAdmin();
  }

  ngOnInit() {
    this.loadRooms();
    this.loadGuests();
    this.startFormAdd();
    this.eventRoomsImage();
    this.eventDateRange();
  }

  private startFormAdd() {
    this.formAdd = new FormGroup({
      id: new FormControl('', Validators.required),
      encargado: new FormControl('', Validators.required),
      huesped: new FormControl('', Validators.required),
      habitacion: new FormControl('', Validators.required),
      tipo_pago: new FormControl(this.data.dataStatus),
      valor_pagado: new FormControl('', Validators.required),
      fecha_inicio: new FormControl('', Validators.required),
      fecha_fin: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    var pay = this.generatePayEntity();
    this._paysService.add(pay).subscribe((response: any) => {
      if (this.data.dataStatus == 2) {
        this._reservesService.add({
          administradorId: this.idAdmin,
          valorPagado: this.abono,
          pagoId: response.id
        } as ReserveCreate).subscribe((r) => {
          this._alertService.showSuccessAlert('Reserva registrada con éxito', 1).then((result) => {
            if (result.isConfirmed) {
              this._dialogRef.close('updated');
            }
          });
        },
          (e) => {
            console.log(e);
            this._alertService.showSuccessAlert('Ha Ocurrido un error.!', 2);
          });
      } else {
        this._alertService.showSuccessAlert('Pago registrado con éxito', 1).then((result) => {
          if (result.isConfirmed) {
            this._dialogRef.close('updated');
          }
        });
      }
    },
      (error) => {
        console.log(error);
        this._alertService.showSuccessAlert('Ha Ocurrido un error.!', 2);
      }
    );
  }

  generatePayEntity(): PaysCreate {
    switch (this.data.dataStatus) {
      case 1:
        return {
          habitacionId: this.formAdd.value.habitacion,
          huespedId: this.huesped_id,
          administradorId: this.idAdmin,
          tipoPagoId: this.data.dataStatus,
          valorPagado: this.total,
          valorAPagar: this.total,
          serviciosHabitacion: this.servicios_habitacion,
          fechaInicio: this.formAdd.value.fecha_inicio,
          fechaFin: this.formAdd.value.fecha_fin
        } as PaysCreate;
      case 2:
        return {
          habitacionId: this.formAdd.value.habitacion,
          huespedId: this.huesped_id,
          administradorId: this.idAdmin,
          tipoPagoId: this.data.dataStatus,
          valorPagado: this.abono,
          valorAPagar: this.total,
          serviciosHabitacion: this.servicios_habitacion,
          fechaInicio: this.formAdd.value.fecha_inicio,
          fechaFin: this.formAdd.value.fecha_fin
        } as PaysCreate;
      default:
        return {};
    }
  }

  cancel() {
    this._dialogRef.close();
  }

  loadGuests() {
    this._guestsService.getAll().subscribe(data => {
      this.huespedes = data;
      this.huespedesCombo = data;
    });
  }

  loadGuestsAsync() {
    return this._guestsService.getAll().pipe(
      map(data => {
        this.huespedes = data;
        this.huespedesCombo = data;
        return data; // Pasamos los datos sin modificar
      })
    );
  }

  loadRooms() {
    this._roomsService.getAllActivates().subscribe(data => {
      this.habitaciones = data;
    });
  }

  getAbono(inputRef: HTMLInputElement): void {
    this.abono = parseFloat(inputRef.value);
  }

  eventRoomsImage() {
    this.formAdd.get('habitacion')!.valueChanges.subscribe(valorSeleccionado => {
      const habitacionSeleccionada = this.habitaciones.find(habitacion => habitacion.id === valorSeleccionado);
      if (habitacionSeleccionada && habitacionSeleccionada.foto) {
        this.foto = this.baseUrl + "/" + habitacionSeleccionada.foto;
        this.formAdd.patchValue({
          valor_pagado: habitacionSeleccionada.precio
        });
        habitacionSeleccionada.habitacionServicioOfrecido.forEach((element: any, index: number) => {
          if (element.servicioOfrecido && element.servicioOfrecido.nombre) {
            this.servicios_habitacion += element.servicioOfrecido.nombre + ",";
          }
        });
        if (this.servicios_habitacion.endsWith(",")) {
          this.servicios_habitacion = this.servicios_habitacion.slice(0, -1);
        }
        this.getAvailable();
        this.onDateRangeChange();
        this._cdr.detectChanges();
      } else {
        this.foto = '';
        this.onDateRangeChange();
      }
    });
  }

  eventDateRange() {
    this.formAdd.get('fecha_inicio')!.valueChanges.subscribe(() => {
      this.onDateRangeChange();
      this.getAvailable();
    });
    this.formAdd.get('fecha_fin')!.valueChanges.subscribe(() => {
      this.onDateRangeChange();
      this.getAvailable();
    });
  }

  getAvailable() {
    const fechaInicio = this.formAdd.get('fecha_inicio')!.value;
    const fechaFin = this.formAdd.get('fecha_fin')!.value;
    const idHabitacion = this.formAdd.get('habitacion')!.value;
    if (fechaInicio && fechaFin && idHabitacion) {
      this._paysService.getAvailablePay({
        habitacionId: idHabitacion,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin
      } as PaysCreate).subscribe((response) => {
        if (response && response.length > 0) {
          var fechasOcupadas = this.getDatesNotAvailable(response);
          this._alertService.showSuccessAlert(`<div>Se encuentra ocupado durante ese rango de días:<br>${fechasOcupadas}</div>`, 2);
          this.formAdd.patchValue({
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

  onDateRangeChange() {
    this.dias = this.getDaysRange();
    this.total = this.formAdd.value.valor_pagado * this.dias;
  }

  getDaysRange() {
    const fechaInicio = this.formAdd.get('fecha_inicio')!.value;
    const fechaFin = this.formAdd.get('fecha_fin')!.value;
    if (fechaInicio && fechaFin) {
      const diferenciaTiempo = fechaFin.getTime() - fechaInicio.getTime();
      const dias = diferenciaTiempo / (1000 * 3600 * 24);
      return Math.round(dias); // Redondea al número entero más cercano
    }
    return 0; // Retorna 0 si alguna de las fechas no está definida
  }

  filterGuests(event: Event) {
    const inputValor = (event.target as HTMLInputElement).value;
    const filtroLower = inputValor.toLowerCase();
    this.huespedesCombo = this.huespedes.filter(huesped =>
      huesped.cedula && huesped.cedula.toLowerCase().includes(filtroLower)
    );
    if (this.huespedesCombo.length > 0) {
      this.nombreHuesped = this.huespedesCombo[0].nombres + " " + this.huespedesCombo[0].apellidos;
      this.huesped_id = this.huespedesCombo[0].id;
      this.huespedExiste = true;
    } else {
      this.nombreHuesped = "No existe el huesped con ese número de cédula.";
      this.huespedExiste = false;
    }
    this._cdr.detectChanges();
  }

  async createGuest() {
    this._guestComponentService.openCreateGuestDialog().subscribe(async (response) => {
      if (response && response.isConfirmed) {
        this.cedulaValue = response.data.cedula;
        this.huesped_id = response.data.id;
        try {
          await this.loadGuestsAsync().toPromise(); // Espera a que la carga de huéspedes esté completa
          const huespedEncontrado = this.huespedes.find(huesped =>
            huesped.id === response.data.id
          );

          if (huespedEncontrado) {
            this.nombreHuesped = huespedEncontrado.nombres + " " + huespedEncontrado.apellidos;
          }
        } catch (error) {
          console.log(error);
          this._alertService.showSuccessAlert('Ha ocurrido un error.', 2);
        }
      }
    });
  }

}
