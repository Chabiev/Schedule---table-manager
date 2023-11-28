import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Job} from "../Interfaces/job";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:44330/api/user';

  constructor(private http: HttpClient, private router: Router) { }

  private jwtHelper: JwtHelperService = new JwtHelperService();


  getLoggedInUserId(): string | null {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    }

    return null;
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logInUser(userData: any): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<string>(`${this.apiUrl}/login`, userData, { headers, responseType: 'text' as 'json' });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getJobOptions(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/jobs`);
  }

  getAllUsers(): Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }
}
