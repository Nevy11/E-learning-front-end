import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReturnedHashValue, ReturnedOtp } from './sign-up';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  url: string = '127.0.0.1:8080';
  constructor(private http: HttpClient) {}
  private user_email!: string;
  private user_password!: string;
  private user_name!: string;
  private hashed_otp!: string;

  public get userEmail(): string {
    return this.user_email;
  }

  public set userEmail(v: string) {
    this.user_email = v;
  }

  public get userPassword(): string {
    return this.user_password;
  }

  public set userPassword(v: string) {
    this.user_password = v;
  }

  public get userName(): string {
    return this.user_name;
  }

  public set userName(v: string) {
    this.user_name = v;
  }

  public get HashedOtp(): string {
    return this.hashed_otp;
  }

  public set HashedOtp(v: string) {
    this.hashed_otp = v;
  }

  hash_password(v: string) {
    return this.http.post<ReturnedHashValue>(this.url, { value: v });
  }
  send_otp(email_address: string) {
    return this.http.post<ReturnedOtp>(this.url, {
      email_address: email_address,
    });
  }
}
