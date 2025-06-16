import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TreatmentsComponent } from '../../../components/treatments/treatments.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NewTreatmentsComponent } from '../../../components/treatments/new-treatments/new-treatments/new-treatments.component';

@Component({
  selector: 'app-treatments-dashboard',
  standalone: true,
  imports: [CommonModule,TreatmentsComponent, MatTabsModule, NewTreatmentsComponent],
  templateUrl: './treatments-dashboard.component.html',
  styleUrl: './treatments-dashboard.component.css'
})
export class TreatmentsDashboardComponent {
  selectedTab = 'listTreatments';
}
