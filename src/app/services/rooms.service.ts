import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rooms, RoomsCreate } from '../interfaces/rooms';
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
  
  

  update(rooms: Rooms): Observable<any> {
    return this._httpClient.put(`${this.baseUrl}/habitacion/update`, rooms);
  }

  changeStatus(rooms: Rooms, status : number): Observable<any> {
    rooms.estadoId = status;
    return this._httpClient.put(`${this.baseUrl}/habitacion/update`, rooms);
  }  
}
