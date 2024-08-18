import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// * COMPONENTS
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { MainComponent } from './components/admin/main/main.component';
import { MastersComponent } from './components/admin/masters/masters.component';
import { AuthGuard } from './guards/auth.guard';
import { outsideGuard } from './guards/outside.guard';
import { ClassesComponent } from './components/admin/classes/classes.component';
import { SubjectsComponent } from './components/admin/subjects/subjects.component';
import { UsersComponent } from './components/admin/users/users.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/dashboard',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/classes',
    component: ClassesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/subjects',
    component: SubjectsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
