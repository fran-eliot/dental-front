import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppointmentsComponent } from '../appointments/appointments.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RegisterComponent } from '../register-user/register/register.component';
import { UpdateProfessionalsComponent } from './update-professionals/update-professionals.component';
import { UsersComponent } from '../users/users/users.component';

@Component({
  selector: 'app-professionals',
  imports: [RouterModule,CommonModule, MatTabsModule, RegisterComponent, UpdateProfessionalsComponent, UsersComponent],
  standalone: true,
  templateUrl: './professionals.component.html',
  styleUrl: './professionals.component.css'
})
export class ProfessionalsComponent {
  selectedTab = 'editar';
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){}

  goTo(ruta: string) {
    this.router.navigate([ruta], { relativeTo: this.route });
  }

}
