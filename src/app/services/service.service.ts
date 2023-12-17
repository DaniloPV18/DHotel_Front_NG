import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rooms } from '../interfaces/rooms';
import { Service } from '../interfaces/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  baseUrl: string = `${environment.endpoint}api/rooms/`;
  service: Service[] =
  [
    {
      "id": 1,
      "nombre": "Andres",
      "codigo_servicio": "a",
      "id_personal_registro": 1,
      "fecha_registro": "5/12/2023",
      "fecha_modificacion": "30/11/2023",
      "id_estado": 1
    },
    {
      "id": 2,
      "nombre": "Maria",
      "codigo_servicio": "b",
      "id_personal_registro": 2,
      "fecha_registro": "4/12/2023",
      "fecha_modificacion": "29/11/2023",
      "id_estado": 2
    },
    {
      "id": 3,
      "nombre": "Carlos",
      "codigo_servicio": "c",
      "id_personal_registro": 3,
      "fecha_registro": "3/12/2023",
      "fecha_modificacion": "28/11/2023",
      "id_estado": 1
    },
    {
      "id": 4,
      "nombre": "Laura",
      "codigo_servicio": "d",
      "id_personal_registro": 4,
      "fecha_registro": "2/12/2023",
      "fecha_modificacion": "27/11/2023",
      "id_estado": 2
    },
    {
      "id": 5,
      "nombre": "David",
      "codigo_servicio": "e",
      "id_personal_registro": 5,
      "fecha_registro": "1/12/2023",
      "fecha_modificacion": "26/11/2023",
      "id_estado": 1
    },
    {
      "id": 6,
      "nombre": "Sofia",
      "codigo_servicio": "f",
      "id_personal_registro": 6,
      "fecha_registro": "30/11/2023",
      "fecha_modificacion": "25/11/2023",
      "id_estado": 2
    },
    {
      "id": 7,
      "nombre": "Pedro",
      "codigo_servicio": "g",
      "id_personal_registro": 7,
      "fecha_registro": "29/11/2023",
      "fecha_modificacion": "24/11/2023",
      "id_estado": 1
    },
    {
      "id": 8,
      "nombre": "Isabel",
      "codigo_servicio": "h",
      "id_personal_registro": 8,
      "fecha_registro": "28/11/2023",
      "fecha_modificacion": "23/11/2023",
      "id_estado": 2
    },
    {
      "id": 9,
      "nombre": "Hector",
      "codigo_servicio": "i",
      "id_personal_registro": 9,
      "fecha_registro": "27/11/2023",
      "fecha_modificacion": "22/11/2023",
      "id_estado": 1
    },
    {
      "id": 10,
      "nombre": "Elena",
      "codigo_servicio": "j",
      "id_personal_registro": 10,
      "fecha_registro": "26/11/2023",
      "fecha_modificacion": "21/11/2023",
      "id_estado": 2
    },
    {
      "id": 11,
      "nombre": "Roberto",
      "codigo_servicio": "k",
      "id_personal_registro": 11,
      "fecha_registro": "25/11/2023",
      "fecha_modificacion": "20/11/2023",
      "id_estado": 1
    },
    {
      "id": 12,
      "nombre": "Sara",
      "codigo_servicio": "l",
      "id_personal_registro": 12,
      "fecha_registro": "24/11/2023",
      "fecha_modificacion": "19/11/2023",
      "id_estado": 2
    },
    {
      "id": 13,
      "nombre": "Raul",
      "codigo_servicio": "m",
      "id_personal_registro": 13,
      "fecha_registro": "23/11/2023",
      "fecha_modificacion": "18/11/2023",
      "id_estado": 1
    },
    {
      "id": 14,
      "nombre": "Carmen",
      "codigo_servicio": "n",
      "id_personal_registro": 14,
      "fecha_registro": "22/11/2023",
      "fecha_modificacion": "17/11/2023",
      "id_estado": 2
    },
    {
      "id": 15,
      "nombre": "Fernando",
      "codigo_servicio": "o",
      "id_personal_registro": 15,
      "fecha_registro": "21/11/2023",
      "fecha_modificacion": "16/11/2023",
      "id_estado": 1
    }
  ]




  constructor(private http: HttpClient) { }

  getAllServices(): Service[] {
    return this.service;
  }

  addService(service: Service) {
    return this.http.post(`${this.baseUrl}addUser/`, service);
  }

  updateService(service: Service) {
    console.log(service);
    //return this.http.post(`${this.baseUrl}updateUser/`, user);
  }

}
