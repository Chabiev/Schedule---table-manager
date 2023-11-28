import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../Services/user.service";
import {passwordMatchValidator} from "../../Validators/passwordMatch.Validator";
import {Router} from "@angular/router";
import {Job} from "../../Interfaces/job";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  jobOptions: Job[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.fetchJobOptions();
  }

  createForm(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      jobId: [null, Validators.required]
    }, { validators: passwordMatchValidator });
  }

  Register(): void {
    if (this.registrationForm.valid) {
      const { confirmPassword, jobId, ...userData } = this.registrationForm.value;
      const job = jobId as Job;

      this.userService.registerUser({ ...userData, jobId: job.id }).subscribe({
        next: (response) => {
          console.log(response);
          this.toastr.success('Registration successful', 'Success');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log('Registration failed: ', error);
        }
      });
    }
  }

  fetchJobOptions(): void {
    this.userService.getJobOptions().subscribe({
      next: (response) => {
        console.log('Job options:', response);
        this.jobOptions = response;
      },
      error: (error) => {
        console.error('Error fetching job options:', error);
      }
    });
  }
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
  compareFn(option: any, value: any): boolean {
    return option && value ? option.id === value.id : option === value;
  }
}
