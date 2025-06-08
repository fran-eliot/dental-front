import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfessionalService } from '../../../service/professional/professional.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selector-disponibilidades',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './selector-disponibilidades.component.html',
  styleUrl: './selector-disponibilidades.component.css'
})
export class SelectorDisponibilidadesComponent {
  profesionales: any[] = [];
  professionalId!: number;
  date!: string;

  constructor(private router: Router, private professionalService: ProfessionalService) {}

  // ojo!! Necesitamos getActiveProfessionals!!!!
  ngOnInit(): void {
    this.professionalService.getProfessionals().subscribe(data => {
      this.profesionales = data;
    });
  }

  @Output() verDisponibilidades = new EventEmitter<{ professionalId: number, date: string }>();

  emitirSeleccion() {
    if (this.professionalId && this.date) {
      this.verDisponibilidades.emit({ professionalId: this.professionalId, date: this.date });
    }
  }
}
