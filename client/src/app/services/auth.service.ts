import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/auth'; // Use environment configuration

  constructor() {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/login`, credentials) // Specify expected response type
      .pipe(catchError(this.handleError));
  }

  signup(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
  }): Observable<any> {
    console.log(data);
    return this.http
      .post<any>(`${this.baseUrl}/signup`, data) // Specify expected response type
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    // Enhanced error handling
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage); // Return an observable with a user-facing error message
  }
}
