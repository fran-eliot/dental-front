import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppointmentsComponent } from '../../components/appointments/appointments.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NewAppointmentsComponent } from '../../components/appointments/new-appointments/new-appointments/new-appointments.component';
@Component({
  selector: 'app-appointments-dashboard',
  standalone: true,
  imports: [CommonModule,AppointmentsComponent, MatTabsModule,NewAppointmentsComponent],
  templateUrl: './appointments-dashboard.component.html',
  styleUrl: './appointments-dashboard.component.css'
})
export class AppointmentsDashboardComponent {
  selectedTab = 'listado';
}
