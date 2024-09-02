import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/Auth/login.service';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from './services/Admin/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Scheule Maker';

  constructor(private router: Router, private authService: LoginService, private cookieService: CookieService){
    const userInSession: any = this.cookieService.get('userInSession')
  }

  IsLoggedIn(): Boolean {
    return !!this.authService.loggedIn()
  }

  SignOut(){
    this.authService.SignOut()
    this.router.navigate(['']);
  }

  IsAdmin(): Boolean{
    let res = false
    let userRank = this.cookieService.get('userPositionInSession')
    if(userRank.slice(-1) == '1'){
      res = true
    }
    return res
  }

  IsOperator(): Boolean{
    let res = false
    let userRank = this.cookieService.get('userPositionInSession')
    if(userRank.slice(-1) == '2'){
      res = true
    }
    return res
  }

  IsMaster(): Boolean{
    let res = false
    let userRank = this.cookieService.get('userPositionInSession')
    if(userRank.slice(-1) == '3'){
      res = true
    }
    return res
  }
}
