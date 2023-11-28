import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private apiUrl = 'https://localhost:44330/api/user';

  constructor(private http: HttpClient) {}

  getAllSchedules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/dashboard`);
  }

  private refreshDashboardSubject: BehaviorSubject<{}> = new BehaviorSubject<{}>({});

  refreshDashboard(): void {
    this.refreshDashboardSubject.next({});
  }

  getRefreshDashboardObservable(): Observable<{}> {
    return this.refreshDashboardSubject.asObservable();
  }
}
