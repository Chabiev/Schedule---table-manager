import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const jwtToken = localStorage.getItem('token');

    if (jwtToken) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
