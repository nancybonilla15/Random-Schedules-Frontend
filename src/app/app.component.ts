import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/Auth/login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Scheule Maker';

  constructor(private router: Router, private authService: LoginService, private cookieService: CookieService){
    const userInSession: any = this.cookieService.get('userInSession')
    console.log(JSON.stringify(userInSession))
  }

  IsLoggedIn(): Boolean {
    return !!this.authService.loggedIn()
  }

  SignOut(){
    this.authService.SignOut()
    this.router.navigate(['']);
    console.log('Sesion termianda')
  }
}
