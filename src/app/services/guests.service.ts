import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Guests } from '../interfaces/guests';

@Injectable({
  providedIn: 'root'
})
export class GuestsService {

  baseUrl: string = `${environment.endpoint}api/guests/`;
  guests: Guests[] =
  [
    {
      "id": 1,
      "cedula": "09999999",
      "nombres": "Joan",
      "apellidos": "Alfon",
      "celular": "0999999999",
      "id_genero": 1,
      "id_personal_registro": 1,
      "fecha_registro": "14/12/2023",
      "fecha_modificacion": "14/12/2023"
    },
    {
      "id": 2,
      "cedula": "08888888",
      "nombres": "Laura",
      "apellidos": "Gomez",
      "celular": "0888888888",
      "id_genero": 2,
      "id_personal_registro": 2,
      "fecha_registro": "13/12/2023",
      "fecha_modificacion": "13/12/2023"
    },
    {
      "id": 3,
      "cedula": "07777777",
      "nombres": "Carlos",
      "apellidos": "Rodriguez",
      "celular": "0777777777",
      "id_genero": 1,
      "id_personal_registro": 3,
      "fecha_registro": "12/12/2023",
      "fecha_modificacion": "12/12/2023"
    },
    {
      "id": 4,
      "cedula": "06666666",
      "nombres": "Ana",
      "apellidos": "Perez",
      "celular": "0666666666",
      "id_genero": 2,
      "id_personal_registro": 4,
      "fecha_registro": "11/12/2023",
      "fecha_modificacion": "11/12/2023"
    },
    {
      "id": 5,
      "cedula": "05555555",
      "nombres": "David",
      "apellidos": "Lopez",
      "celular": "0555555555",
      "id_genero": 1,
      "id_personal_registro": 5,
      "fecha_registro": "10/12/2023",
      "fecha_modificacion": "10/12/2023"
    },
    {
      "id": 6,
      "cedula": "04444444",
      "nombres": "Maria",
      "apellidos": "Garcia",
      "celular": "0444444444",
      "id_genero": 2,
      "id_personal_registro": 6,
      "fecha_registro": "09/12/2023",
      "fecha_modificacion": "09/12/2023"
    },
    {
      "id": 7,
      "cedula": "03333333",
      "nombres": "Pedro",
      "apellidos": "Martinez",
      "celular": "0333333333",
      "id_genero": 1,
      "id_personal_registro": 7,
      "fecha_registro": "08/12/2023",
      "fecha_modificacion": "08/12/2023"
    },
    {
      "id": 8,
      "cedula": "02222222",
      "nombres": "Isabel",
      "apellidos": "Fernandez",
      "celular": "0222222222",
      "id_genero": 2,
      "id_personal_registro": 8,
      "fecha_registro": "07/12/2023",
      "fecha_modificacion": "07/12/2023"
    },
    {
      "id": 9,
      "cedula": "01111111",
      "nombres": "Hector",
      "apellidos": "Ramirez",
      "celular": "0111111111",
      "id_genero": 1,
      "id_personal_registro": 9,
      "fecha_registro": "06/12/2023",
      "fecha_modificacion": "06/12/2023"
    },
    {
      "id": 10,
      "cedula": "00000000",
      "nombres": "Elena",
      "apellidos": "Vargas",
      "celular": "0000000000",
      "id_genero": 2,
      "id_personal_registro": 10,
      "fecha_registro": "05/12/2023",
      "fecha_modificacion": "05/12/2023"
    },
    {
      "id": 11,
      "cedula": "11111111",
      "nombres": "Roberto",
      "apellidos": "Sanchez",
      "celular": "1111111111",
      "id_genero": 1,
      "id_personal_registro": 11,
      "fecha_registro": "04/12/2023",
      "fecha_modificacion": "04/12/2023"
    },
    {
      "id": 12,
      "cedula": "22222222",
      "nombres": "Sofia",
      "apellidos": "Torres",
      "celular": "2222222222",
      "id_genero": 2,
      "id_personal_registro": 12,
      "fecha_registro": "03/12/2023",
      "fecha_modificacion": "03/12/2023"
    },
    {
      "id": 13,
      "cedula": "33333333",
      "nombres": "Raul",
      "apellidos": "Mendoza",
      "celular": "3333333333",
      "id_genero": 1,
      "id_personal_registro": 13,
      "fecha_registro": "02/12/2023",
      "fecha_modificacion": "02/12/2023"
    },
    {
      "id": 14,
      "cedula": "44444444",
      "nombres": "Carmen",
      "apellidos": "Hernandez",
      "celular": "4444444444",
      "id_genero": 2,
      "id_personal_registro": 14,
      "fecha_registro": "01/12/2023",
      "fecha_modificacion": "01/12/2023"
    },
    {
      "id": 15,
      "cedula": "55555555",
      "nombres": "Fernando",
      "apellidos": "Gutierrez",
      "celular": "5555555555",
      "id_genero": 1,
      "id_personal_registro": 15,
      "fecha_registro": "30/11/2023",
      "fecha_modificacion": "30/11/2023"
    }
  ]


  constructor(private http: HttpClient) { }

  getAllGuests(): Guests[] {
    return this.guests;
  }

  addGuests(guest: Guests) {
    return this.http.post(`${this.baseUrl}addUser/`, guest);
  }

  updateGuests(guest: Guests) {
    console.log(guest);
    //return this.http.post(`${this.baseUrl}updateUser/`, user);
  }

}
