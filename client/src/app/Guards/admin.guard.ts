import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const jwtToken = localStorage.getItem('token');
    const decodedToken = this.decodeToken(jwtToken);
    const role = decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    if (role === '1') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  private decodeToken(token: string | null): any {
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
  }

}
