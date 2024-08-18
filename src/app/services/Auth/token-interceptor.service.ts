import { Injectable } from '@angular/core';
import { HttpInterceptor } from "@angular/common/http";
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private getToken: LoginService){}

  intercept(req: any, next: any){
    const tokenReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${this.getToken.GetToken()}`
      }
    })
    return next.handle(tokenReq)
  }
}
