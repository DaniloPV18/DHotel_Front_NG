import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaysService } from '../../../../services/pays.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomsService } from '../../../../services/rooms.service';
import { ServiceService } from '../../../../services/service.service';
import { Rooms, RoomsCreate } from '../../../../interfaces/rooms';
import { AlertConfirmationService } from '../../../../services/alert-confirmation.service';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrl: './room-create.component.css'
})
export class RoomCreateComponent implements OnInit {

  disabled: boolean = false; // Puedes cambiar este valor según la lógica de tu componente

  fileName: string = "";

  imageSrc: string | ArrayBuffer | null = null;

  opciones: any[] = [];

  formAdd = new FormGroup({
    numero: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    tipo_habitacion: new FormControl('', Validators.required),
    opcionesSeleccionadas: new FormControl([], Validators.required),
    foto: new FormControl(null, Validators.required) // Agrega esto
  });

  constructor(
    private _dialogRef: MatDialogRef<RoomCreateComponent>,
    private _roomsServices: RoomsService,
    private _servicesServices: ServiceService,
    private _alertService : AlertConfirmationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.cargarOpcionesServicios();
  }

  cargarOpcionesServicios() {
    this._servicesServices.getAllActives().subscribe(
      data => {
        this.opciones = data.map(item => ({
          valor: item.id,
          vista: item.nombre
        }));
      },
      error => {
        console.error('Hubo un error al obtener las opciones', error);
      }
    );
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.fileName = file.name;
      this.formAdd.get('foto')!.setValue(file as any);
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    } else {
      if (!this.fileName) {
        this.formAdd.get('foto')!.setValue(null);
      }
    }
  }

  obtenerValoresSeleccionados(): void {
    console.log(this.formAdd.value.opcionesSeleccionadas); // Aquí están los valores seleccionados
  }


  onSubmit() {
    this._roomsServices.add({
      numero: this.formAdd.value.numero,
      administradorId: 1,
      tipoHabitacionId: this.formAdd.value.tipo_habitacion,
      precio: this.formAdd.value.precio,
      foto: this.formAdd.value.foto,
      habitacionServicioOfrecido: this.formAdd.value.opcionesSeleccionadas
    } as RoomsCreate).subscribe((response) => {
      this._alertService.showSuccessAlert('Administrador agregado con éxito', 1)
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
