import { Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: SigninComponent
    },
    {
        path: 'app/dashboard',
        component: DashboardComponent
    }
];
