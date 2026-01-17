import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest } from '../core/models/auth/login-request.dto';
import { Observable } from 'rxjs';
import { LoginResponseDto } from '../core/models/auth/login-response.dto';
import { RegisterRequest } from '../core/models/auth/register-request.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly _http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/Auth`;

  login(request: LoginRequest): Observable<LoginResponseDto> {
    return this._http.post<LoginResponseDto>(`${this.url}/login`, request);
  }

  register(request: RegisterRequest): Observable<any> {
    return this._http.post<any>(`${this.url}/register`, request);
  }

  saveToken(token:string) : void{
    localStorage.setItem('auth_token', token);
  }

}
