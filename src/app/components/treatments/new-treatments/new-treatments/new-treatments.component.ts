import { Component } from '@angular/core';
import { Treatment } from '../../../../model/Treatment';
import { TreatmentService } from '../../../../service/treatment/treatment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-treatments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-treatments.component.html',
  styleUrl: './new-treatments.component.css'
})
export class NewTreatmentsComponent {

  treatments: Treatment[] ;
  constructor(private treatmentService: TreatmentService) {}

  createTreatment(treatment: Treatment): void {
      this.treatmentService.createTreatment(treatment).subscribe({
        next: (data) => {
          console.log('Tratamiento creado:', data);
          this.treatments.push(data); // Añadir el nuevo tratamiento a la lista
        },
        error: (err) => {
          console.error('Error al crear tratamiento:', err);
        }
      });
    }
}
