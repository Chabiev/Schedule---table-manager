import { Component } from '@angular/core';
import {WorkerService} from "../../Services/worker.service";
import {UserService} from "../../Services/user.service";
import {FormBuilder} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ModalService} from "../../Services/modal.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  selectedSchedule: any;
  isModalOpen = false;
  constructor(
    private workerService: WorkerService,
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public modalService: ModalService
  ) { }


  openScheduleApprovalModal() {
    if (!this.isModalOpen) {

      this.modalService.openModal();

      this.isModalOpen = true;
    } else {
      this.modalService.closeModal();

      this.isModalOpen = false;
    }
  }


}
