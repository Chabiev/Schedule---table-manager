import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordMatchValidator} from "../../Validators/passwordMatch.Validator";
import {UserService} from "../../Services/user.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.createForm();
  }


  createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  Login() {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
      this.userService.logInUser(userData).subscribe({
        next: (response: any) => {
          console.log(response);

          const jwtToken = response;
          localStorage.setItem('token', jwtToken);

          console.log("logged in successfully");
          console.log(response);

          const decodedToken = this.decodeToken(jwtToken);
          const role = decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

          if (role === '1') {
            this.router.navigate(['/admin']);
          } else if (role === '2') {
            this.router.navigate(['/worker']);
          } else {
            this.toastr.error('Unknown user role. Please contact support.', 'Error');
          }

          this.toastr.success('Login successful', 'Success');
        },
        error: (error) => {
          console.log('Login failed: ', error);

          this.toastr.error('Login failed. Please check your credentials.', 'Error');
        }
      });
    }
  }
  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Error decoding JWT token:', e);
      return null;
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

}
