import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertConfirmationService {

  constructor() { }

  showSuccessAlert(text: string, i: number): Promise<any> {
    switch (i) {
      case 1:
        return Swal.fire({
          title: '¡Éxito!',
          html: text,
          icon: 'success',
          confirmButtonText: 'Ok',
          customClass: {
            container: 'custom-swal'
          }
        });
      case 2:
        return Swal.fire({
          title: 'Error!',
          html: text,
          icon: 'error',
          confirmButtonText: 'Ok',
          customClass: {
            container: 'custom-swal'
          }
        });
      default:
        return Promise.reject('Opción no válida');
    }
  }
}
