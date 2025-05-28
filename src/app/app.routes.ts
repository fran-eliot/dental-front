import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { ProfessionalsAvailabilitiesComponent } from './components/professionals-availabilities/professionals-availabilities.component';
import { AdminComponent } from './views/admin/admin/admin.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';

export const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'availabilities',
    component: ProfessionalsAvailabilitiesComponent
  },
  {
    //proteger rutas?
    path:'admin',
    component: AdminComponent
  },
  {

    path:'appointments',
    component: AppointmentsComponent
  }
];

