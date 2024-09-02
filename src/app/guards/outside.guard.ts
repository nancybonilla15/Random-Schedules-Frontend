import { LoginService } from './../services/Auth/login.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

export class outsideGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean{
    const isAuthenticated = this.loginService.OutSide();
    if (!isAuthenticated) {
      this.router.navigate(['']);

    }
    this.router.navigate(['app/dashboard']);
    return true
  }
}

