import { Injectable } from '@angular/core';
import { Users } from '../interfaces/users';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl: string = `${environment.endpoint}api/users/`;
  users: Users[] =
    [
      {
        id: 1,
        nombres: 'John',
        cedula: '123456789',
        apellidos: 'Doe',
        correo: 'john@example.com',
        ultima_actividad: '2023-01-01',
        id_genero: 1,
        id_estado: 1,
        id_rol: 1
      },
      {
        id: 2,
        nombres: 'Jane',
        cedula: '987654321',
        apellidos: 'Smith',
        correo: 'jane@example.com',
        ultima_actividad: '2023-01-02',
        id_genero: 2,
        id_estado: 2,
        id_rol: 2
      },
      {
        id: 3,
        nombres: 'Alice',
        cedula: '111222333',
        apellidos: 'Johnson',
        correo: 'alice@example.com',
        ultima_actividad: '2023-01-03',
        id_genero: 2,
        id_estado: 1,
        id_rol: 2
      },
      {
        id: 4,
        nombres: 'Bob',
        cedula: '444555666',
        apellidos: 'Brown',
        correo: 'bob@example.com',
        ultima_actividad: '2023-01-04',
        id_genero: 1,
        id_estado: 2,
        id_rol: 1
      },
      {
        id: 5,
        nombres: 'Eva',
        cedula: '777888999',
        apellidos: 'Miller',
        correo: 'eva@example.com',
        ultima_actividad: '2023-01-05',
        id_genero: 2,
        id_estado: 1,
        id_rol: 1
      },
      {
        id: 6,
        nombres: 'Charlie',
        cedula: '123123123',
        apellidos: 'Clark',
        correo: 'charlie@example.com',
        ultima_actividad: '2023-01-06',
        id_genero: 1,
        id_estado: 2,
        id_rol: 2
      },
      {
        id: 7,
        nombres: 'Diana',
        cedula: '456456456',
        apellidos: 'Davis',
        correo: 'diana@example.com',
        ultima_actividad: '2023-01-07',
        id_genero: 2,
        id_estado: 1,
        id_rol: 1
      },
      {
        id: 8,
        nombres: 'Frank',
        cedula: '789789789',
        apellidos: 'Fisher',
        correo: 'frank@example.com',
        ultima_actividad: '2023-01-08',
        id_genero: 1,
        id_estado: 2,
        id_rol: 2
      },
      {
        id: 9,
        nombres: 'Grace',
        cedula: '321321321',
        apellidos: 'Gray',
        correo: 'grace@example.com',
        ultima_actividad: '2023-01-09',
        id_genero: 2,
        id_estado: 1,
        id_rol: 1
      },
      {
        id: 10,
        nombres: 'Henry',
        cedula: '654654654',
        apellidos: 'Harris',
        correo: 'henry@example.com',
        ultima_actividad: '2023-01-10',
        id_genero: 1,
        id_estado: 2,
        id_rol: 2
      },
      {
        id: 11,
        nombres: 'Isabel',
        cedula: '987987987',
        apellidos: 'Irwin',
        correo: 'isabel@example.com',
        ultima_actividad: '2023-01-11',
        id_genero: 2,
        id_estado: 1,
        id_rol: 1
      },
      {
        id: 12,
        nombres: 'Jack',
        cedula: '135135135',
        apellidos: 'Jones',
        correo: 'jack@example.com',
        ultima_actividad: '2023-01-12',
        id_genero: 1,
        id_estado: 2,
        id_rol: 2
      }
    ];

    constructor(private _httpClient: HttpClient) { }

  getAllUsers(): Users[] {
    return this.users;
  }

  addUser(user: Users) {
    return this._httpClient.post(`${this.baseUrl}addUser/`, user);
  }

  updateUser(user: Users) {
    console.log(user);
    //return this._httpClient.post(`${this.baseUrl}updateUser/`, user);
  }

  deleteUser(id: number) {
    return this._httpClient.put(`${this.baseUrl}deleteUser/${id}`, id);
  }
}
