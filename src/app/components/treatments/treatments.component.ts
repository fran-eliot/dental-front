import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('inputName') inputName!: ElementRef;
  editIndex: number | null = null;


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
  startEdit(index: number): void {
    this.editIndex = index;
  }

  cancelEdit(): void {
    this.editIndex = null;
  }

  updateTreatmentById(id_treatment: number, treatment:Treatment): void {
    treatment.visible_to_patients_treatments = treatment.visible_to_patients_treatments ?? true;
    console.log('Componente va a actualizar:', id_treatment, treatment);
    this.treatmentService.updateTreatment(id_treatment, treatment).subscribe({
      next: (treatment) => {
        console.log('Tratamiento actualizado:', treatment);
        this.showSuccessMessage('Tratamiento actualizado correctamente');
        this.editIndex = null;
        setTimeout(() => this.inputName.nativeElement.focus(), 0);
      },
      error: (err) => {
        console.error('Error al actualizar tratamiento por ID:', err);
      }
    });
  }

  showSuccessMessage(message: string): void {
    alert(message); // Puedes reemplazar esto con un componente de notificación como Toastr
  }
}
