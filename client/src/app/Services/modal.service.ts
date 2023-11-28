import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private isModalOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  private unapprovedSchedules: any[] = [];



  setUnapprovedSchedules(schedules: any[]): void {
    this.unapprovedSchedules = schedules;
  }

  getUnapprovedSchedules(): any[] {
    return this.unapprovedSchedules;
  }

  getModalState(): Observable<boolean> {
    return this.isModalOpenSubject.asObservable();
  }

  openModal(): void {
    this.isModalOpenSubject.next(true);
  }

  closeModal(): void {
    this.isModalOpenSubject.next(false);
  }
}
