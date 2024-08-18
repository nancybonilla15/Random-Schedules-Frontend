import { TokenInterceptorService } from './services/Auth/token-interceptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { MainComponent } from './components/admin/main/main.component';
import { MastersComponent } from './components/admin/masters/masters.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from "./guards/auth.guard";
import { CookieService } from 'ngx-cookie-service';
import { ClassesComponent } from './components/admin/classes/classes.component';
import { SubjectsComponent } from './components/admin/subjects/subjects.component';
import { UsersComponent } from './components/admin/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    MainComponent,
    MastersComponent,
    ClassesComponent,
    SubjectsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CookieService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
