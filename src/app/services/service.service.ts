import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Service } from '../interfaces/service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  baseUrl: string = `${environment.endpoint}api/v1`;

  constructor(private _httpClient: HttpClient) { }

  getAll(): Observable<Service[]> {
    return this._httpClient.get<Service[]>(`${this.baseUrl}/serviciosofrecidos`);;
  }

  add(service: Service): Observable<any> {
    return this._httpClient.post(`${this.baseUrl}/serviciosofrecidos`, service);
  }

  update(service: Service): Observable<any> {
    return this._httpClient.put(`${this.baseUrl}/serviciosofrecidos/update`, service);
  }

  changeStatus(element: Service, status: number): Observable<any> {
    element.estadoId = status;
    return this._httpClient.put(`${this.baseUrl}/serviciosofrecidos/update`, element);
  }
}
