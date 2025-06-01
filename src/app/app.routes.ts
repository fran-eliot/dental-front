import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { ProfessionalsAvailabilitiesComponent } from './components/professionals-availabilities/professionals-availabilities.component';
import { AdminComponent } from './views/admin/admin/admin.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { RegisterComponent } from './components/register-user/register/register.component';
import { ProfessionalsComponent } from './components/professionals/professionals.component';

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
  },
  /*{

    path:'register',
    component: RegisterComponent
  },*/
  {

    path:'dentistas',
    component: ProfessionalsComponent,
    children: [
      { path: 'registrar', component: RegisterComponent }
      //{ path: 'editar', component: EditarDentistaComponent },
      //{ path: 'lista', component: ListaDentistasComponent }
    ]
  }
];

