import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserve, ReserveCreate, ReserveUpdate } from '../interfaces/reserve';
@Injectable({
  providedIn: 'root'
})
export class ReservesService {
  baseUrl: string = `${environment.endpoint}api/v1`;

  constructor(private _httpClient: HttpClient) { }

  getAllByIdPay(pagoId: number): Observable<Reserve[]> {
    return this._httpClient.get<Reserve[]>(`${this.baseUrl}/reservas/pago/${pagoId}`);
  }

  add(reserve: ReserveCreate) {
    return this._httpClient.post(`${this.baseUrl}/reservas`, reserve);
  }

  update(reserve: ReserveUpdate) {
    return this._httpClient.put(`${this.baseUrl}/reservas/update`, reserve);
  }

  changeStatus(reserve: ReserveUpdate, status: number) {
    reserve.estadoId = status;
    return this._httpClient.put(`${this.baseUrl}/reservas/updateStatus`, reserve);
  }
}
