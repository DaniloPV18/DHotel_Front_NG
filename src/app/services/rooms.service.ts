import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rooms } from '../interfaces/rooms';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  baseUrl: string = `${environment.endpoint}api/rooms/`;
  rooms: Rooms[] =
  [
    {
      "id": 1,
      "numero": 1,
      "id_tipo_habitacion": 1,
      "id_personal_registro": 1,
      "fecha_registro": "5/12/2023",
      "fecha_modificacion": "30/11/2023",
      "id_estado": 1,
      "precio": 50,
      "foto_ruta": "ruta1"
    },
    {
      "id": 2,
      "numero": 2,
      "id_tipo_habitacion": 2,
      "id_personal_registro": 2,
      "fecha_registro": "4/12/2023",
      "fecha_modificacion": "29/11/2023",
      "id_estado": 2,
      "precio": 60,
      "foto_ruta": "ruta2"
    },
    {
      "id": 3,
      "numero": 3,
      "id_tipo_habitacion": 1,
      "id_personal_registro": 3,
      "fecha_registro": "3/12/2023",
      "fecha_modificacion": "28/11/2023",
      "id_estado": 1,
      "precio": 55,
      "foto_ruta": "ruta3"
    },
    {
      "id": 4,
      "numero": 4,
      "id_tipo_habitacion": 2,
      "id_personal_registro": 4,
      "fecha_registro": "2/12/2023",
      "fecha_modificacion": "27/11/2023",
      "id_estado": 2,
      "precio": 70,
      "foto_ruta": "ruta4"
    },
    {
      "id": 5,
      "numero": 5,
      "id_tipo_habitacion": 1,
      "id_personal_registro": 5,
      "fecha_registro": "1/12/2023",
      "fecha_modificacion": "26/11/2023",
      "id_estado": 1,
      "precio": 65,
      "foto_ruta": "ruta5"
    },
    {
      "id": 6,
      "numero": 6,
      "id_tipo_habitacion": 2,
      "id_personal_registro": 6,
      "fecha_registro": "30/11/2023",
      "fecha_modificacion": "25/11/2023",
      "id_estado": 2,
      "precio": 80,
      "foto_ruta": "ruta6"
    },
    {
      "id": 7,
      "numero": 7,
      "id_tipo_habitacion": 1,
      "id_personal_registro": 7,
      "fecha_registro": "29/11/2023",
      "fecha_modificacion": "24/11/2023",
      "id_estado": 1,
      "precio": 75,
      "foto_ruta": "ruta7"
    },
    {
      "id": 8,
      "numero": 8,
      "id_tipo_habitacion": 2,
      "id_personal_registro": 8,
      "fecha_registro": "28/11/2023",
      "fecha_modificacion": "23/11/2023",
      "id_estado": 2,
      "precio": 90,
      "foto_ruta": "ruta8"
    },
    {
      "id": 9,
      "numero": 9,
      "id_tipo_habitacion": 1,
      "id_personal_registro": 9,
      "fecha_registro": "27/11/2023",
      "fecha_modificacion": "22/11/2023",
      "id_estado": 1,
      "precio": 85,
      "foto_ruta": "ruta9"
    },
    {
      "id": 10,
      "numero": 10,
      "id_tipo_habitacion": 2,
      "id_personal_registro": 10,
      "fecha_registro": "26/11/2023",
      "fecha_modificacion": "21/11/2023",
      "id_estado": 2,
      "precio": 100,
      "foto_ruta": "ruta10"
    },
    {
      "id": 11,
      "numero": 11,
      "id_tipo_habitacion": 1,
      "id_personal_registro": 11,
      "fecha_registro": "25/11/2023",
      "fecha_modificacion": "20/11/2023",
      "id_estado": 1,
      "precio": 95,
      "foto_ruta": "ruta11"
    },
    {
      "id": 12,
      "numero": 12,
      "id_tipo_habitacion": 2,
      "id_personal_registro": 12,
      "fecha_registro": "24/11/2023",
      "fecha_modificacion": "19/11/2023",
      "id_estado": 2,
      "precio": 110,
      "foto_ruta": "ruta12"
    },
    {
      "id": 13,
      "numero": 13,
      "id_tipo_habitacion": 1,
      "id_personal_registro": 13,
      "fecha_registro": "23/11/2023",
      "fecha_modificacion": "18/11/2023",
      "id_estado": 1,
      "precio": 105,
      "foto_ruta": "ruta13"
    },
    {
      "id": 14,
      "numero": 14,
      "id_tipo_habitacion": 2,
      "id_personal_registro": 14,
      "fecha_registro": "22/11/2023",
      "fecha_modificacion": "17/11/2023",
      "id_estado": 2,
      "precio": 120,
      "foto_ruta": "ruta14"
    },
    {
      "id": 15,
      "numero": 15,
      "id_tipo_habitacion": 1,
      "id_personal_registro": 15,
      "fecha_registro": "21/11/2023",
      "fecha_modificacion": "16/11/2023",
      "id_estado": 1,
      "precio": 115,
      "foto_ruta": "ruta15"
    }
  ]



  constructor(private http: HttpClient) { }

  getAllRooms(): Rooms[] {
    return this.rooms;
  }

  addRooms(rooms: Rooms) {
    return this.http.post(`${this.baseUrl}addUser/`, rooms);
  }

  updateRooms(rooms: Rooms) {
    console.log(rooms);
    //return this.http.post(`${this.baseUrl}updateUser/`, user);
  }

}
