import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailOtpVerifyService {
  url: string = 'http://127.0.0.1:8080';
  constructor(private http: HttpClient) {}
}
