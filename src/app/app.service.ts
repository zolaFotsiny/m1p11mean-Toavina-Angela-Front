import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl = 'https://m1p11mean-toavina-angela.onrender.com';

  constructor(private http: HttpClient) { }

  getServices(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/services`);;
  }

  login(credentials: { email: string; mot_de_passe: string }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials, httpOptions)
      .pipe(
        catchError(error => {
          // Handle errors here
          console.error('Error during login:', error);
          return throwError(error);
        })
      );
  }



  createService(data: FormData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders()
    };

    return this.http.post<any>(`${this.apiUrl}/services`, data, httpOptions)
      .pipe(
        catchError(error => {
          // Handle errors here
          console.error('Error creating service:', error);
          return throwError(error);
        })
      );
  }

  registerUser(userData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token') ?? ''
      })
    };

    return this.http.post<any>(`${this.apiUrl}/users/register`, userData, httpOptions)
      .pipe(
        catchError(error => {
          // Handle errors here
          console.error('Error registering user:', error);
          return throwError(error);
        })
      );
  }

}
