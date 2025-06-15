import { Component } from '@angular/core';
import { Treatments } from '../../Model/treatments';
import { TreatmentsService } from '../../service/treatments.Service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-treatments',
  imports: [FormsModule, CommonModule],
  templateUrl: './treatments.component.html',
  styleUrl: './treatments.component.css'
})
export class TreatmentsComponent {
  treatments: Treatments[];
  constructor(private treatmentsService: TreatmentsService) {}

  ngOnInit(): void {
    this.treatmentsService.buscarTreatments().subscribe({
      next: (data) => {
        this.treatments = data;
      },
      error: (err) => {
        console.error('Error al cargar tratamientos:', err);
      }
    });
  }
  createTreatment(treatment: Treatments): void {
    this.treatmentsService.createTreatment(treatment).subscribe({
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
