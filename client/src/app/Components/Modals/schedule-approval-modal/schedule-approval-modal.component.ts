import {Component, Input, OnInit} from '@angular/core';
import {Schedule} from "../../../Interfaces/schedule";
import {ModalService} from "../../../Services/modal.service";
import {AdminService} from "../../../Services/admin.service";
import {AdminComponent} from "../../admin/admin.component";
import {ToastrService} from "ngx-toastr";
import {ScheduleService} from "../../../Services/schedule.service";

@Component({
  selector: 'app-schedule-approval-modal',
  templateUrl: './schedule-approval-modal.component.html',
  styleUrls: ['./schedule-approval-modal.component.css']
})
export class ScheduleApprovalModalComponent implements OnInit{

  unapprovedSchedules: any[] = [];

  ngOnInit(): void {
    this.modalService.getModalState().subscribe(isModalOpen => {
      console.log('Is Modal Open:', isModalOpen);
      if (isModalOpen) {
        this.fetchUnapprovedSchedules();
      }
    });
  }

  constructor(
    private modalService: ModalService,
    private adminService: AdminService,
    private toastr: ToastrService,
    private scheduleService: ScheduleService
  ) {}

  approveSchedule(id: number): void {
    console.log('Before calling approveSchedule API');
    this.adminService.approveSchedule(id).subscribe(
      {
        next: (response) => {
          console.log('After successful approval API response');
          this.toastr.success('Schedule approved successfully!', 'Success');
          this.fetchUnapprovedSchedules();
          this.scheduleService.refreshDashboard();
        },
        error: (error) => {
          console.log('Error approving schedule:', error);
          this.toastr.error('Error approving schedule!', 'Error');
        }
      }
    );
    console.log('After calling approveSchedule API');
  }




  declineSchedule(id: number): void {
    this.adminService.declineSchedule(id).subscribe(
      {
        next: (response) => {
          this.toastr.info('Schedule declined successfully!', 'Info');
          this.fetchUnapprovedSchedules();
          this.modalService.closeModal();
          this.scheduleService.refreshDashboard();
        },
        error: (error) => {
          this.toastr.error('Error declining schedule!', 'Error');
          console.log(error);
        }
      }
    );
  }

  closeModal() {
    this.modalService.closeModal();
  }

  private fetchUnapprovedSchedules(): void {
    this.unapprovedSchedules = this.modalService.getUnapprovedSchedules();
  }

}
