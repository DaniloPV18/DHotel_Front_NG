import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from '../../../../services/service.service';
import { AlertConfirmationService } from '../../../../services/alert-confirmation.service';
import { environment } from '../../../../../environments/environment';
import { RoomsService } from '../../../../services/rooms.service';
import { RoomsUpdate } from '../../../../interfaces/rooms';
import { IdAdminService } from '../../../../services/components/id-admin.service';

@Component({
  selector: 'app-room-update',
  templateUrl: './room-update.component.html',
  styleUrl: './room-update.component.css'
})
export class RoomUpdateComponent {

  disabled: boolean = false; // Puedes cambiar este valor según la lógica de tu componente

  fileName: string = "";

  baseUrl: string = `${environment.endpoint}ImagesGlobal`;

  imageSrc: string | ArrayBuffer | null = null;

  opciones: any[] = [];

  opcionesCargadas: any[] = [];

  formModify !: FormGroup;

  idAdmin !: number | null;

  constructor(
    private _dialogRef: MatDialogRef<RoomUpdateComponent>,
    private _roomsServices: RoomsService,
    private _servicesServices: ServiceService,
    private _alertService: AlertConfirmationService,
    private _idAdminService: IdAdminService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idAdmin = this._idAdminService.getIdAdmin();
    this.inicializarFormulario();
    this.cargarOpcionesMarcadas();
  }

  ngOnInit() {
    this.cargarOpcionesServicios();
  }

  inicializarFormulario() {
    this.formModify = new FormGroup({
      numero: new FormControl(this.data.dataModal.numero, Validators.required),
      tipo_habitacion: new FormControl(this.data.dataModal.tipoHabitacionId, Validators.required),
      precio: new FormControl(this.data.dataModal.precio, Validators.required),
      opcionesSeleccionadas: new FormControl([this.opcionesCargadas]),
      foto: new FormControl(null)
    });

    if (this.data.dataModal.foto) {
      this.imageSrc = `${this.baseUrl}/${this.data.dataModal.foto}`;
      this.fileName = this.data.dataModal.foto;
    }
  }

  cargarOpcionesMarcadas() {
    this.opcionesCargadas = this.data.dataModal.habitacionServicioOfrecido.map((element: any) => element.servicioOfrecidoId);
    this.formModify.get('opcionesSeleccionadas')!.setValue(this.opcionesCargadas);
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
      this.formModify.get('foto')!.setValue(file as any);
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    } else {
      if (!this.fileName) {
        this.formModify.get('foto')!.setValue(null);
      }
    }
  }

  onSubmit() {
    this._roomsServices.update({
      id: this.data.dataModal.id,
      numero: this.formModify.value.numero ?? this.data.dataModal.numero,
      administradorId: this.idAdmin,
      tipoHabitacionId: this.formModify.value.tipo_habitacion ?? this.data.dataModal.tipoHabitacionId,
      estadoId: this.data.dataModal.estadoId,
      precio: this.formModify.value.precio ?? this.data.dataModal.precio,
      foto: this.formModify.value.foto ?? this.data.dataModal.foto,
      habitacionServicioOfrecido: this.formModify.value.opcionesSeleccionadas
    } as RoomsUpdate).subscribe((response) => {
      this._alertService.showSuccessAlert('Habitacion actualizada con éxito', 1)
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
    );;
  }

  cancel() {
    this._dialogRef.close();
  }
}
