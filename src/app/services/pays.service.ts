import { Injectable } from '@angular/core';
import { Pays } from '../interfaces/pays';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PaysService {
  baseUrl: string = `${environment.endpoint}api/pays/`;
  pays: Pays[] =
    [
      {
        id: 1,
        id_personal_registro: 100,
        id_huesped: 200,
        id_habitacion: 300,
        id_tipo_pago: 1,
        valor_pagado_actual: 5000,
        valor_a_pagar: 7500,
        fecha_inicio: "2023-07-01",
        fecha_fin: "2023-07-10",
        fecha_registro: "2023-06-25",
        ultima_actividad: "2023-07-02"
      },
      {
        id: 2,
        id_personal_registro: 101,
        id_huesped: 201,
        id_habitacion: 301,
        id_tipo_pago: 2,
        valor_pagado_actual: 2000,
        valor_a_pagar: 4500,
        fecha_inicio: "2023-08-15",
        fecha_fin: "2023-08-20",
        fecha_registro: "2023-08-10",
        ultima_actividad: "2023-08-16"
      },
      {
        id: 3,
        id_huesped: 202,
        id_tipo_pago: 1,
        valor_pagado_actual: 3500,
        valor_a_pagar: 3500,
        fecha_inicio: "2023-09-05",
        fecha_fin: "2023-09-12",
        fecha_registro: "2023-09-01",
        ultima_actividad: "2023-09-06"
      }
    ];

  constructor(private _httpClient: HttpClient) { }

  getAllPays() {
    return this.pays;
  }
}
