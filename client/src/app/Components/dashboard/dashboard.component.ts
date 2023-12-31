import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ScheduleService } from "../../Services/schedule.service";
import { UserService } from "../../Services/user.service";
import { Job } from "../../Interfaces/job";
import {ModalService} from "../../Services/modal.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  schedules: any[] = [];
  weekdays: string[] = [];
  dates: string[] = [];
  distinctJobTitles: Job[] = [];
  currentDate: Date;
  approvedSchedules: any[] = [];
  unapprovedSchedules: any[] = [];
  constructor(
    private scheduleService: ScheduleService,
    private userService: UserService,
    private modalService:ModalService
  ) {
    this.currentDate = new Date();
  }

  ngOnInit(): void {
    this.loadData();
    this.loadUnapprovedSchedules();

    this.scheduleService.getRefreshDashboardObservable().subscribe(() => {
      this.loadData();
      this.loadUnapprovedSchedules();
    });
  }

  async loadData() {
    try {
      const result = await forkJoin([
        this.scheduleService.getAllSchedules(),
        this.userService.getJobOptions(),


      ]).toPromise();

      if (result && result.length === 2) {
        const [schedules, jobOptions] = result;

        this.approvedSchedules = schedules.filter(schedule => schedule.isApproved);
        this.unapprovedSchedules = schedules.filter(schedule => !schedule.isApproved);
        this.modalService.setUnapprovedSchedules(this.unapprovedSchedules);

        this.distinctJobTitles = jobOptions;

        this.generateWeekdaysAndDates();
        this.generateWeekTitle();
      } else {
        console.error('Error fetching data: Result is undefined or has an unexpected format');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  private generateWeekdaysAndDates(): void {
    this.weekdays = [];
    this.dates = [];

    const today = this.currentDate.getDay();

    for (let i = 0; i < 7; i++) {
      const dayOffset = (i + 7 - today) % 7;
      const date = new Date(this.currentDate);
      date.setDate(this.currentDate.getDate() + dayOffset);

      this.weekdays.push(this.getDayOfWeek(date.getDay()));
      this.dates.push(this.formatDate(date));
    }

    this.dates.sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.getTime() - dateB.getTime();
    });
  }

  private getDayOfWeek(day: number): string {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[day];
  }

  private formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  getShiftForJobTitleAndDate(jobTitle: string, date: string): { shifts: string[] } {
    const schedulesForJobTitle = this.approvedSchedules.filter(
      (schedule) => schedule.jobTitle === jobTitle
    );

    const uniqueShifts: { [key: string]: string } = {};

    schedulesForJobTitle
      .filter(
        (schedule) => this.formatDate(new Date(schedule.startTime)) === date
      )
      .sort(
        (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      )
      .forEach((schedule) => {
        const shiftType = this.getShift(schedule.startTime);
        const key = `${shiftType}-${schedule.firstName}-${schedule.lastName}`;

        if (!uniqueShifts[key]) {
          uniqueShifts[key] = `${shiftType} - ${schedule.firstName} ${schedule.lastName}`;
        }
      });

    const morningShifts = Object.values(uniqueShifts).filter(shift => shift.includes('Morning'));
    const eveningShifts = Object.values(uniqueShifts).filter(shift => shift.includes('Evening'));

    const shifts = [...morningShifts, ...eveningShifts];

    return { shifts };
  }

  public getShift(startTime: string): string {
    const scheduleTime = new Date(startTime);
    const morningShiftStart = new Date(scheduleTime);
    morningShiftStart.setHours(8, 0, 0, 0);

    const eveningShiftStart = new Date(scheduleTime);
    eveningShiftStart.setHours(16, 0, 0, 0);

    if (scheduleTime >= morningShiftStart && scheduleTime < eveningShiftStart) {
      return 'Morning';
    } else {
      return 'Evening';
    }
  }

  goForward(): void {
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.generateWeekdaysAndDates();
  }

  goBackward(): void {
    this.currentDate.setDate(this.currentDate.getDate() - 7);
    this.generateWeekdaysAndDates();
  }


  generateWeekTitle(): string {
    const startDate = this.dates[0];
    const endDate = this.dates[this.dates.length - 1];

    const startDateParts = startDate.split(' ');
    const endDateParts = endDate.split(' ');

    const startMonth = startDateParts[1];
    const endMonth = endDateParts[1];

    if (!startMonth || !endMonth) {
      return 'Invalid Date Format';
    }

    return `${startDateParts[0]} ${endMonth} - ${endDateParts[0]} ${endMonth} [Week #${this.getWeekNumber(this.currentDate)}]`;
  }




  private getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }


  loadUnapprovedSchedules(): void {
    this.unapprovedSchedules = this.getUnapprovedSchedules();
    this.modalService.setUnapprovedSchedules(this.unapprovedSchedules);
    console.log('unapproved schedules', this.unapprovedSchedules);
  }

  getUnapprovedSchedules(): any[] {
    return this.unapprovedSchedules.map(schedule => {
      const { id, firstName, lastName, jobTitle, startTime } = schedule;
      const shift = this.getShift(startTime);
      const date = this.formatDate(new Date(startTime));

      return {
        id,
        firstName,
        lastName,
        jobTitle,
        shift,
        date,
      };
    });
  }


  refreshDashboard(): void {
    this.loadData();
    this.loadUnapprovedSchedules();
  }

}
