import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, ReturnLogin } from './login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  url = 'http://127.0.0.1:8080';
  login_user(data: Login) {
    return this.http.post<ReturnLogin>(`${this.url}/login`, data);
  }
}
