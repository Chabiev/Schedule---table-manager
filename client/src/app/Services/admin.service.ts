import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://localhost:44330/api/Admin';
  constructor(private http: HttpClient, private router: Router) { }


  approveSchedule(scheduleId: number): Observable<any> {
    const params = { scheduleId: scheduleId.toString() };
    return this.http.post(`${this.apiUrl}/approve-schedule-request`, null, { params });
  }

  declineSchedule(scheduleId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-schedule/${scheduleId}`);
  }

}
