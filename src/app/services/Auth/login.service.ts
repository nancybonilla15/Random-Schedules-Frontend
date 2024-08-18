import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL = 'http://localhost:3000'

  constructor(private http: HttpClient, private cookieService:CookieService) { }

  Login(loginData: any){
    return this.http.post<any>(this.URL + '/signin', loginData)
  }

  loggedIn(): Boolean{
    if(!!this.cookieService.get('token')){
      // console.log(this.cookieService.get('token'), this.cookieService.get('token').length)
      return true
    }else{
      return false
    }
  }

  OutSide(): Boolean{
    if(!!this.cookieService.get('token')){
      // console.log(this.cookieService.get('token'), this.cookieService.get('token').length)
      return false
    }else{
      return true
    }
  }

  GetToken(){
    return this.cookieService.get('token')
  }

  SignOut(){
    this.cookieService.deleteAll();
  }
}
