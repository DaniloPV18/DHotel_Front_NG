import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Guests } from '../interfaces/guests';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestsService {

  baseUrl: string = `${environment.endpoint}api/v1`;

  constructor(private _httpClient: HttpClient) { }

  getAll(): Observable<Guests[]> {
    return this._httpClient.get<Guests[]>(`${this.baseUrl}/huesped`);
  }

  add(guest: Guests): Observable<any> {
    return this._httpClient.post(`${this.baseUrl}/huesped`, guest);
  }

  update(guest: Guests): Observable<any> {
    return this._httpClient.put(`${this.baseUrl}/huesped/update`, guest);
  }

}
