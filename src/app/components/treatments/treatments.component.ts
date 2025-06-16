import { Component } from '@angular/core';
import { Treatment } from '../../model/Treatment';
import { TreatmentService } from '../../service/treatment/treatment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-treatments',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './treatments.component.html',
  styleUrl: './treatments.component.css'
})
export class TreatmentsComponent {
  treatments: Treatment[] ;
  constructor(private treatmentService: TreatmentService) {}

  ngOnInit(): void {
    this.treatmentService.buscarTreatments().subscribe({
      next: (data) => {
        this.treatments = data;
      },
      error: (err) => {
        console.error('Error al cargar tratamientos:', err);
      }
    });
  }
}
