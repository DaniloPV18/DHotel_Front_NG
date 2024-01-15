import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from '../../../../services/service.service';
import { AlertConfirmationService } from '../../../../services/alert-confirmation.service';
import { environment } from '../../../../../environments/environment';

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

  formModify = new FormGroup({
    numero: new FormControl(this.data.dataModal.numero, Validators.required),
    tipo_habitacion: new FormControl(this.data.dataModal.tipoHabitacionId, Validators.required),
    precio: new FormControl(this.data.dataModal.precio, Validators.required),
    opcionesSeleccionadas: new FormControl(this.data.dataModal.opcionesSeleccionadas, Validators.required),
    foto: new FormControl(null, Validators.required) // Agrega esto
  });

  constructor(
    private _dialogRef: MatDialogRef<RoomUpdateComponent>,
    private _servicesServices: ServiceService,
    private _alertService: AlertConfirmationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data.dataModal.foto) {
      this.imageSrc = `${this.baseUrl}/${this.data.dataModal.foto}`;
      this.fileName = this.data.dataModal.foto;
    }
  }

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

  obtenerValoresSeleccionados(): void {
    console.log(this.formModify.value.opcionesSeleccionadas); // Aquí están los valores seleccionados
  }

  onSubmit() {

  }

  cancel() {
    this._dialogRef.close();
  }
}
