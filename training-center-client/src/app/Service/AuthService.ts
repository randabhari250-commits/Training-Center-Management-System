import { Injectable } from "@angular/core";
import  { inject } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable, pipe, tap } from "rxjs";
import { AuthResponse } from "../Model/Auth";
import { Login } from "../Model/Auth";
import { Register } from "../Model/Auth";
import { RegisterResponse } from "../Model/Auth";



@Injectable({providedIn:'root'})
export class AuthService {
  private http = inject(HttpClient);

  Register(register: Register): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      'http://localhost:5023/api/Auth/register',
      register
    );
  }

  Login(login: Login): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      'http://localhost:5023/api/Auth/login',
      login
    ).pipe(
      tap((data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('expiration', data.expiration.toString());
        localStorage.setItem('email', data.email);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    const expiration = localStorage.getItem('expiration');

    if (!token || !expiration) {
      return false;
    }

    return new Date(expiration) > new Date();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('email');
  }
}
