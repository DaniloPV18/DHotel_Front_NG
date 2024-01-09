import { Injectable } from '@angular/core';
import { Administrators } from '../interfaces/administrators';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministratorsService {

  baseUrl: string = `${environment.endpoint}api/v1/administrador`;
  /* administrators: Administrators[] =
    [
      {
        id: 1,
        nombres: 'John',
        cedula: '123456789',
        apellidos: 'Doe',
        email: 'john@example.com',
        ultimaActividad: '2023-01-01',
        generoId: 1,
        estadoId: 1,
        rolId: 1
      },
      {
        id: 2,
        nombres: 'Jane',
        cedula: '987654321',
        apellidos: 'Smith',
        email: 'jane@example.com',
        ultimaActividad: '2023-01-02',
        generoId: 2,
        estadoId: 2,
        rolId: 2
      },
      {
        id: 3,
        nombres: 'Alice',
        cedula: '111222333',
        apellidos: 'Johnson',
        email: 'alice@example.com',
        ultimaActividad: '2023-01-03',
        generoId: 2,
        estadoId: 1,
        rolId: 2
      },
      {
        id: 4,
        nombres: 'Bob',
        cedula: '444555666',
        apellidos: 'Brown',
        email: 'bob@example.com',
        ultimaActividad: '2023-01-04',
        generoId: 1,
        estadoId: 2,
        rolId: 1
      },
      {
        id: 5,
        nombres: 'Eva',
        cedula: '777888999',
        apellidos: 'Miller',
        email: 'eva@example.com',
        ultimaActividad: '2023-01-05',
        generoId: 2,
        estadoId: 1,
        rolId: 1
      },
      {
        id: 6,
        nombres: 'Charlie',
        cedula: '123123123',
        apellidos: 'Clark',
        email: 'charlie@example.com',
        ultimaActividad: '2023-01-06',
        generoId: 1,
        estadoId: 2,
        rolId: 2
      },
      {
        id: 7,
        nombres: 'Diana',
        cedula: '456456456',
        apellidos: 'Davis',
        email: 'diana@example.com',
        ultimaActividad: '2023-01-07',
        generoId: 2,
        estadoId: 1,
        rolId: 1
      },
      {
        id: 8,
        nombres: 'Frank',
        cedula: '789789789',
        apellidos: 'Fisher',
        email: 'frank@example.com',
        ultimaActividad: '2023-01-08',
        generoId: 1,
        estadoId: 2,
        rolId: 2
      },
      {
        id: 9,
        nombres: 'Grace',
        cedula: '321321321',
        apellidos: 'Gray',
        email: 'grace@example.com',
        ultimaActividad: '2023-01-09',
        generoId: 2,
        estadoId: 1,
        rolId: 1
      },
      {
        id: 10,
        nombres: 'Henry',
        cedula: '654654654',
        apellidos: 'Harris',
        email: 'henry@example.com',
        ultimaActividad: '2023-01-10',
        generoId: 1,
        estadoId: 2,
        rolId: 2
      },
      {
        id: 11,
        nombres: 'Isabel',
        cedula: '987987987',
        apellidos: 'Irwin',
        email: 'isabel@example.com',
        ultimaActividad: '2023-01-11',
        generoId: 2,
        estadoId: 1,
        rolId: 1
      },
      {
        id: 12,
        nombres: 'Jack',
        cedula: '135135135',
        apellidos: 'Jones',
        email: 'jack@example.com',
        ultimaActividad: '2023-01-12',
        generoId: 1,
        estadoId: 2,
        rolId: 2
      }
    ]; */

    constructor(private _httpClient: HttpClient) { }

  getAllUsers(): Observable<Administrators[]> {
    return this._httpClient.get<Administrators[]>(this.baseUrl);
  }

  addUser(user: Administrators) {
    return this._httpClient.post(`${this.baseUrl}addUser/`, user);
  }

  updateUser(user: Administrators) {
    console.log(user);
    //return this._httpClient.post(`${this.baseUrl}updateUser/`, user);
  }

  deleteUser(id: number) {
    return this._httpClient.put(`${this.baseUrl}deleteUser/${id}`, id);
  }
}
