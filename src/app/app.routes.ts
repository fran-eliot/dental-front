import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { ProfessionalsAvailabilitiesComponent } from './components/professionals-availabilities/professionals-availabilities.component';

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
  }
];
