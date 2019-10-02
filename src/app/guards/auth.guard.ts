import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authSrv: AuthService,
    private routerSrv: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authSrv.check()) {
      return true;
    }
    this.routerSrv.navigate(['auth/login']);
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authSrv.check()) {
      return true;
    }
    this.routerSrv.navigate(['auth/login']);
    return false;
  }
}
