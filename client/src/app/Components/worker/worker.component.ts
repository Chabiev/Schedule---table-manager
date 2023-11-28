import { Component } from '@angular/core';
import {WorkerService} from "../../Services/worker.service";
import {UserService} from "../../Services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent {

  users: any[] = [];
  scheduleForm!: FormGroup;
  scheduleDate: string ='';
  selectedShift: 'morning' | 'evening' = 'morning';

  constructor(
    private workerService: WorkerService,
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.createForm();
  }


  createForm() {
    this.scheduleForm = this.fb.group({
      date: ['', Validators.required],
      startTime: [''],
      endTime: [''],
      userId: [0]
    });
  }
  setShift(shift: 'morning' | 'evening') {
    this.selectedShift = shift;

    if (shift === 'morning') {
      this.scheduleForm.patchValue({
        startTime: '08:00',
        endTime: '16:00'
      });
    } else {
      this.scheduleForm.patchValue({
        startTime: '16:00',
        endTime: '23:00'
      });
    }
  }


  addSchedule() {
    const token = localStorage.getItem('token');

    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);

      console.log('Decoded Token:', decodedToken);

      const userIdArray = decodedToken?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

      if (!userIdArray || !userIdArray.length) {
        console.error('User ID is not present or has an invalid format in the decoded token.');
        return;
      }

      const userId = userIdArray[0];

      const startDate = new Date(`${this.scheduleDate}T${this.scheduleForm.value.startTime}`);
      const endDate = new Date(`${this.scheduleDate}T${this.scheduleForm.value.endTime}`);

      if (this.selectedShift === 'morning') {
        endDate.setHours(startDate.getHours() + 8);
      } else {
        endDate.setHours(startDate.getHours() + 7);
      }

      const startTime = startDate.toISOString();
      const endTime = endDate.toISOString();

      const scheduleData = {
        startTime: startTime,
        endTime: endTime,
        userId: userId
      };

      console.log('Schedule Data:', scheduleData);

      this.workerService.addScheduleRequest(scheduleData).subscribe({
        next: (response) => {
          console.log('Schedule added successfully:', response);
          this.toastr.success('Schedule added successfully!', 'Success');
        },
        error: (error) => {
          console.error('Error adding schedule:', error);
        }
      });
    } else {
      console.error('Token not found in local storage');
    }
  }

}
