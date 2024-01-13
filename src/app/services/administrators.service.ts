import { Injectable } from '@angular/core';
import { Administrators, AdministratorsUpdate } from '../interfaces/administrators';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministratorsService {

  baseUrl: string = `${environment.endpoint}api/v1`;

  constructor(private _httpClient: HttpClient) { }

  getAll(): Observable<Administrators[]> {
    return this._httpClient.get<Administrators[]>(`${this.baseUrl}/administrador`);
  }

  add(administrator: Administrators): Observable<any> {
    return this._httpClient.post(`${this.baseUrl}/administrador`, administrator);
  }

  update(administrator: AdministratorsUpdate): Observable<any> {
    return this._httpClient.put(`${this.baseUrl}/administrador/update`, administrator);
  }

  changeStatus(element: Administrators, status: number): Observable<any> {
    element.estadoId = status;
    return this._httpClient.put(`${this.baseUrl}/administrador/updateStatus`, element);
  }
}
