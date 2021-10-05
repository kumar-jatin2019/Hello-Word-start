import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let status = false;

    if (localStorage.getItem('status') == "true") {
      status = true;
      return true;
    } else {
      status = false;
      this.router.navigate(['/']);
      return false;
    }
    return status;
    if (this.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
    // navigate to login page as user is not authenticated      

  }
  public isLoggedIn(): boolean {
    let status = false;
    if (localStorage.getItem('status') == "true") {
      status = true;
    }
    else {
      status = false;
    }
    return status;
  }

}
