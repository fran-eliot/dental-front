import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { AdminComponent } from './views/admin/admin/admin.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { RegisterComponent } from './components/register-user/register/register.component';
import { ProfessionalsComponent } from './components/professionals/professionals.component';
import { UpdateProfessionalsComponent } from './components/professionals/update-professionals/update-professionals.component';
import { ListaDisponibilidadesComponent } from './components/disponibilidades/lista-disponibilidades/lista-disponibilidades.component';
import { SelectorDisponibilidadesComponent } from './components/disponibilidades/selector-disponibilidades/selector-disponibilidades.component';
import { DisponibilidadesDashboardComponent } from './views/disponibilidades-dashboard/disponibilidades-dashboard.component';
import { GeneradorDisponibilidadesComponent } from './components/disponibilidades/generador-disponibilidades/generador-disponibilidades.component';
import { LimpiezaDisponibilidadesComponent } from './components/disponibilidades/limpieza-disponibilidades/limpieza-disponibilidades.component';
import { ConsultaDisponibilidadesComponent } from './components/disponibilidades/consulta-disponibilidades/consulta-disponibilidades.component';
import { SlotsLibresComponent } from './components/disponibilidades/slots-libres/slots-libres.component';
import { PatientsComponent } from './components/patients/patients.component';
import { UsersComponent } from './components/users/users/users.component';
import { TreatmentsComponent } from './components/treatments/treatments.component';
import { AppointmentsDashboardComponent } from './views/appointments-dashboard/appointments-dashboard/appointments-dashboard.component';
import { DisponibilidadesMensualesComponent } from './components/disponibilidades/disponibilidades-mensuales/disponibilidades-mensuales.component';
import { TreatmentsDashboardComponent } from './views/treatments-dashboard/treatments-dashboard/treatments-dashboard.component';
import { authGuard } from './auth.guard';
import { roleGuard } from './role.guard';


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
    //rutas protegidas
    path:'admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] },
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'appointments-dashboard',
        pathMatch: 'full'  // para que redirija solo si el path es exacto
      },
      {
        path: 'appointments-dashboard',
        component: AppointmentsDashboardComponent,
      },
      {
        path: 'tratamientos',
        component: TreatmentsDashboardComponent,
      },
      {
        path: 'dentistas',
        component: ProfessionalsComponent,
      },
      {
        path: 'pacientes',
        component: PatientsComponent
      },
      {
        path: 'disponibilidades',
        component: DisponibilidadesDashboardComponent,
        children: [
          { path: '', component: SelectorDisponibilidadesComponent },
          { path: ':id/:date', component: ListaDisponibilidadesComponent },
          { path: 'generar', component: GeneradorDisponibilidadesComponent },
          { path: 'genera-mes', component: DisponibilidadesMensualesComponent},
          { path: 'limpiar', component: LimpiezaDisponibilidadesComponent }
        ]
      },
      {
        path: 'dashboard/disponibilidades/consulta',
        component: ConsultaDisponibilidadesComponent
      },
      {
        path: 'dashboard/slots-libres/consulta',
        component: SlotsLibresComponent
      },
      { path: 'tratamientos', component: TreatmentsComponent }
      //{ path: 'editarPassword', component: UsersComponent }
    ]
  },
  {
    path:'appointments',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] },
    component: AppointmentsComponent
  }
];

