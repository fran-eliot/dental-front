import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { ProfessionalsAvailabilitiesComponent } from './components/professionals-availabilities/professionals-availabilities.component';
import { AdminComponent } from './views/admin/admin/admin.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { RegisterComponent } from './components/register-user/register/register.component';
import { ProfessionalsComponent } from './components/professionals/professionals.component';
import { UpdateProfessionalsComponent } from './components/professionals/update-professionals/update-professionals.component';
import { UsersComponent } from './components/users/users/users.component';
import { PatientsComponent } from './components/patients/patients.component';

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
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'appointments',
        pathMatch: 'full'  // muy importante para que redirija solo si el path es exacto
      },
      {
        path: 'appointments',
        component: AppointmentsComponent
      },
      {
        path: 'dentistas',
        component: ProfessionalsComponent,
        children: [
          { path: 'registrar', component: RegisterComponent },
          { path: 'editar', component: UpdateProfessionalsComponent },
          { path: 'editarPassword', component: UsersComponent }
        ]
      },
      {
        path: 'pacientes',
        component: PatientsComponent // Si tienes este componente definido
      },
      {
        path: 'disponibilidad',
        component: ProfessionalsAvailabilitiesComponent
      }
      //{ path: 'editar', component: UpdateProfessionalsComponent }
      //{ path: 'editarPassword', component: UsersComponent }
    ]
  },
  {

    path:'appointments',
    component: AppointmentsComponent
  },
  /*{

    path:'register',
    component: RegisterComponent
  },*/
  /*{
    path:'dentistas',
    component: ProfessionalsComponent,
    children: [
      { path: 'registrar', component: RegisterComponent },
      { path: 'editar', component: UpdateProfessionalsComponent },
      { path: 'editarPassword', component: UsersComponent }
    ]
  }*/
];

