import { Component } from '@angular/core';
import {UserService} from "../../Services/user.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private userService: UserService) { }

  logout(){
    this.userService.logout();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
