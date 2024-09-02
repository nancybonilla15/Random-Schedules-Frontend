import { LoginService } from './../services/Auth/login.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean{
    const isAuthenticated = this.loginService.loggedIn();
    if (isAuthenticated) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
