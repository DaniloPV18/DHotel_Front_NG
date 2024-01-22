import { Injectable } from '@angular/core';
import { Pays, PaysCreate } from '../interfaces/pays';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaysService {
  baseUrl: string = `${environment.endpoint}api/v1`;

  constructor(private _httpClient: HttpClient) { }

  getAll(): Observable<Pays[]> {
    return this._httpClient.get<Pays[]>(`${this.baseUrl}/pago`);
  }

  getAvailablePay(pay: PaysCreate): Observable<any> {
    return this._httpClient.post<Pays[]>(`${this.baseUrl}/pago/available`, pay);
  }

  add(pay: PaysCreate) {
    return this._httpClient.post(`${this.baseUrl}/pago`, pay);
  }

  update(pay: Pays) {
    return this._httpClient.put(`${this.baseUrl}/pago/update`, pay);
  }

  changeStatus(pay: Pays) {
    return this._httpClient.delete(`${this.baseUrl}/pago/delete/${pay.id}`);
  }
}
