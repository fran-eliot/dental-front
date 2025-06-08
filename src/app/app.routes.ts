import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { ProfessionalsAvailabilitiesComponent } from './components/professionals-availabilities/professionals-availabilities.component';
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
      { path: 'registrar', component: RegisterComponent },
      { path: 'editar', component: UpdateProfessionalsComponent }
      //{ path: 'lista', component: ListaDentistasComponent }
    ]
  },
  {
    path: 'disponibilidades',
    component: DisponibilidadesDashboardComponent,
    children: [
    { path: '', component: SelectorDisponibilidadesComponent }, // o cualquier otro selector
    { path: ':id/:date', component: ListaDisponibilidadesComponent },
    { path: 'generar', component: GeneradorDisponibilidadesComponent },
    { path: 'limpiar', component: LimpiezaDisponibilidadesComponent }
  ]
  },

  {
    path: 'dashboard/disponibilidades/consulta',
    component: ConsultaDisponibilidadesComponent
  }


];

