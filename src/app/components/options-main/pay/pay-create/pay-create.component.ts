import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../../../environments/environment';
import { RoomsService } from '../../../../services/rooms.service';
import { GuestsService } from '../../../../services/guests.service';
import { GuestComponentsService } from '../../../../services/components/guest-create-component.service';
import { AlertConfirmationService } from '../../../../services/alert-confirmation.service';

@Component({
  selector: 'app-pay-create',
  templateUrl: './pay-create.component.html',
  styleUrl: './pay-create.component.css'
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

  constructor(
    private _dialogRef: MatDialogRef<PayCreateComponent>,
    private _guestComponentService: GuestComponentsService,
    private _roomsService: RoomsService,
    private _guestsService: GuestsService,
    private _alertService: AlertConfirmationService,
    private _cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

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

  loadRooms() {
    this._roomsService.getAllActivates().subscribe(data => {
      this.habitaciones = data;
    });
  }

  eventRoomsImage() {
    this.formAdd.get('habitacion')!.valueChanges.subscribe(valorSeleccionado => {
      const habitacionSeleccionada = this.habitaciones.find(habitacion => habitacion.id === valorSeleccionado);
      if (habitacionSeleccionada && habitacionSeleccionada.foto) {
        this.foto = this.baseUrl + "/" + habitacionSeleccionada.foto;
        this.formAdd.patchValue({
          valor_pagado: habitacionSeleccionada.precio
        });
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
    });
    this.formAdd.get('fecha_fin')!.valueChanges.subscribe(() => {
      this.onDateRangeChange();
    });
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
      this.huespedExiste = true;
    } else {
      this.nombreHuesped = "No existe el huesped con ese número de cédula.";
      this.huespedExiste = false;
    }
    this._cdr.detectChanges();
  }

  createGuest() {
    this._guestComponentService.openCreateGuestDialog().subscribe((response) => {
      if (response.isConfirmed) {
        this._alertService.showSuccessAlert('Huesped agregado con éxito', 1)
          .then((result) => {
            if (result.isConfirmed) { this._dialogRef.close('updated'); }
          });
      }
    },
      (error) => {
        console.log(error);
        this._alertService.showSuccessAlert('Ha Ocurrido un error.!', 2)
          .then((result) => {
          });
      });
  }
}
