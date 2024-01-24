import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rooms, RoomsCreate, RoomsUpdate } from '../interfaces/rooms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  baseUrl: string = `${environment.endpoint}api/v1`;

  constructor(private _httpClient: HttpClient) { }

  getAll(): Observable<Rooms[]> {
    return this._httpClient.get<Rooms[]>(`${this.baseUrl}/habitacion`);
  }

  getAllActivates(): Observable<Rooms[]> {
    return this._httpClient.get<Rooms[]>(`${this.baseUrl}/habitacion/activates`);
  }

  add(rooms: RoomsCreate): Observable<any> {
    const formData = new FormData();
    formData.append('numero', rooms.numero?.toString() || '');
    formData.append('precio', rooms.precio?.toString() || '');
    formData.append('administradorId', rooms.administradorId?.toString() || '');
    formData.append('tipoHabitacionId', rooms.tipoHabitacionId?.toString() || '');
    if (rooms.habitacionServicioOfrecido) {
      rooms.habitacionServicioOfrecido.forEach((servicioId, index) =>
        formData.append(`habitacionServicioOfrecido[${index}]`, servicioId.toString())
      );
    }
    if (rooms.foto) {
      formData.append('foto', rooms.foto, rooms.foto.name);
    }
    return this._httpClient.post(`${this.baseUrl}/habitacion`, formData);
  }

  update(rooms: RoomsUpdate): Observable<any> {
    const formData = new FormData();
    formData.append('id', rooms.id?.toString() || '');
    formData.append('numero', rooms.numero?.toString() || '');
    formData.append('precio', rooms.precio?.toString() || '');
    formData.append('administradorId', rooms.administradorId?.toString() || '');
    formData.append('tipoHabitacionId', rooms.tipoHabitacionId?.toString() || '');
    formData.append('estadoId', rooms.estadoId?.toString() || '');
    if (rooms.habitacionServicioOfrecido) {
      rooms.habitacionServicioOfrecido.forEach((servicioId, index) => {
        formData.append(`habitacionServicioOfrecido[${index}]`, servicioId.toString())
      });
    }
    if (rooms.foto instanceof File) {
      formData.append('foto', rooms.foto, rooms.foto.name);
    }
    return this._httpClient.put(`${this.baseUrl}/habitacion/update`, formData);
  }

  changeStatus(rooms: Rooms, status: number): Observable<any> {
    const formData = new FormData();
    formData.append('id', rooms.id?.toString() || '');
    formData.append('numero', rooms.numero?.toString() || '');
    formData.append('precio', rooms.precio?.toString() || '');
    formData.append('administradorId', rooms.administradorId?.toString() || '');
    formData.append('tipoHabitacionId', rooms.tipoHabitacionId?.toString() || '');
    formData.append('estadoId', status?.toString() || '');
    if (rooms.habitacionServicioOfrecido) {
      rooms.habitacionServicioOfrecido.forEach((servicioId, index) => {
        formData.append(`habitacionServicioOfrecido[${index}]`, servicioId.servicioOfrecidoId)
      });
    }
    if (rooms.foto instanceof File) {
      formData.append('foto', rooms.foto, rooms.foto.name);
    }
    return this._httpClient.put(`${this.baseUrl}/habitacion/update`, formData);
  }
}
