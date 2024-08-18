import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './../../../services/Auth/login.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
  master = {
    identity: '',
    password: '',
  };

  constructor(
    private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService
  ) {
    if (loginService.loggedIn()) {
      router.navigate(['app/dashboard']);
    }
  }

  Login() {
    this.loginService.Login(this.master).subscribe(
      (res) => {
        console.log(res.logUser);
        this.cookieService.set('token', res.token);
        this.cookieService.set('userNameInSession', res.logUser.name);
        this.cookieService.set('userPositionInSession', res.logUser.position);
        this.router.navigate(['app/dashboard']);
        Swal.fire({
          title: 'Bienvenido',
          text: `Bienvenido ${res.logUser.name}.`,
          icon: 'info',
          confirmButtonText: 'Listo',
        });
      },
      (err) => {
        console.log(err);
        console.log(err.error.response);
      }
    );
  }
}
