import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuth, UserResponse } from '../components/login/auth/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: string = `${environment.endpoint}api/v1`;

  constructor(private _httpClient: HttpClient) { }

  get(user: UserAuth): Observable<UserResponse> {
    return this._httpClient.post<UserResponse>(`${this.baseUrl}/auth`, user);
  }
}
