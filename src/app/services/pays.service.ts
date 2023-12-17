import { Injectable } from '@angular/core';
import { Pays } from '../interfaces/pays';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PaysService {
  baseUrl: string = `${environment.endpoint}api/pays/`;
  pays: Pays[] = [
    {
      id: 1,
      personal_registro: "Alice",
      huesped: "Bob",
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
      personal_registro: "Charlie",
      huesped: "David",
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
      personal_registro: "Eva",
      huesped: "Frank",
      id_habitacion: 301,
      id_tipo_pago: 1,
      valor_pagado_actual: 3500,
      valor_a_pagar: 3500,
      fecha_inicio: "2023-09-05",
      fecha_fin: "2023-09-12",
      fecha_registro: "2023-09-01",
      ultima_actividad: "2023-09-06"
    },
    {
      id: 4,
      personal_registro: "Grace",
      huesped: "Harry",
      id_habitacion: 302,
      id_tipo_pago: 1,
      valor_pagado_actual: 4500,
      valor_a_pagar: 6000,
      fecha_inicio: "2023-10-01",
      fecha_fin: "2023-10-07",
      fecha_registro: "2023-09-25",
      ultima_actividad: "2023-10-02"
    },
    {
      id: 5,
      personal_registro: "Ivy",
      huesped: "Jack",
      id_habitacion: 303,
      id_tipo_pago: 2,
      valor_pagado_actual: 3000,
      valor_a_pagar: 5500,
      fecha_inicio: "2023-11-12",
      fecha_fin: "2023-11-18",
      fecha_registro: "2023-11-05",
      ultima_actividad: "2023-11-13"
    },
    {
      id: 6,
      personal_registro: "Kevin",
      huesped: "Lily",
      id_habitacion: 304,
      id_tipo_pago: 1,
      valor_pagado_actual: 3800,
      valor_a_pagar: 5000,
      fecha_inicio: "2023-12-05",
      fecha_fin: "2023-12-12",
      fecha_registro: "2023-11-28",
      ultima_actividad: "2023-12-06"
    },
    {
      id: 7,
      personal_registro: "Mia",
      huesped: "Nathan",
      id_habitacion: 305,
      id_tipo_pago: 2,
      valor_pagado_actual: 2800,
      valor_a_pagar: 4000,
      fecha_inicio: "2024-01-18",
      fecha_fin: "2024-01-25",
      fecha_registro: "2024-01-12",
      ultima_actividad: "2024-01-19"
    },
    {
      id: 8,
      personal_registro: "Olivia",
      huesped: "Peter",
      id_habitacion: 306,
      id_tipo_pago: 1,
      valor_pagado_actual: 3200,
      valor_a_pagar: 4500,
      fecha_inicio: "2024-02-10",
      fecha_fin: "2024-02-17",
      fecha_registro: "2024-02-05",
      ultima_actividad: "2024-02-11"
    },
    {
      id: 9,
      personal_registro: "Quinn",
      huesped: "Rachel",
      id_habitacion: 307,
      id_tipo_pago: 2,
      valor_pagado_actual: 2600,
      valor_a_pagar: 3800,
      fecha_inicio: "2024-03-22",
      fecha_fin: "2024-03-29",
      fecha_registro: "2024-03-15",
      ultima_actividad: "2024-03-23"
    },
    {
      id: 10,
      personal_registro: "Samuel",
      huesped: "Tina",
      id_habitacion: 308,
      id_tipo_pago: 1,
      valor_pagado_actual: 4100,
      valor_a_pagar: 5500,
      fecha_inicio: "2024-04-15",
      fecha_fin: "2024-04-22",
      fecha_registro: "2023-09-01",
      ultima_actividad: "2023-09-06"
    }
  ];

  constructor(private _httpClient: HttpClient) { }

  getAllPays() {
    return this.pays;
  }

  addPay(user: Pays) {
    return this._httpClient.post(`${this.baseUrl}addPay/`, user);
  }

  updatePay(user: Pays) {
    console.log(user);
    //return this._httpClient.post(`${this.baseUrl}updateUser/`, user);
  }

  deletePay(id: number) {
    return this._httpClient.put(`${this.baseUrl}deletePay/${id}`, id);
  }
}
