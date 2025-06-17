import { ProfessionalAvailabitity } from './../../../model/ProfessionalAvailability';
import { Component, OnInit } from '@angular/core';
import * as dayjsLib from 'dayjs';
import { AvailabitlityService } from '../../../service/availability/availabitlity.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const dayjs = dayjsLib.default;

@Component({
  selector: 'app-consulta-disponibilidades-dentista',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './consulta-disponibilidades-dentista.component.html',
  styleUrl: './consulta-disponibilidades-dentista.component.css'
})

export class ConsultaDisponibilidadesDentistaComponent implements OnInit {
  disponibilidades: ProfessionalAvailabitity[] = [];
  error = '';
  filtroPeriodo = 'todos';
  loading = true;
  fechaSeleccionada: string = dayjs().format('YYYY-MM-DD');

  constructor(private availabilityService: AvailabitlityService) {}

  ngOnInit(): void {
    this.cargarDisponibilidades();
  }

  cargarDisponibilidades(): void {
    const professionalId: number = Number(localStorage.getItem('user_id'));

    if (!professionalId) {
      this.error = 'No se pudo obtener el ID del profesional.';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.error = '';

    this.availabilityService.getAvailabilities(professionalId, this.fechaSeleccionada).subscribe({
      next: (data) => {
        this.disponibilidades = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las disponibilidades.';
        this.loading = false;
      }
    });
  }

  actualizarFecha(): void {
    this.cargarDisponibilidades();
  }

  filtrarDisponibilidades() {
    if (this.filtroPeriodo === 'todos') return this.disponibilidades;
    return this.disponibilidades.filter(d => d.slot.period.toLowerCase() === this.filtroPeriodo);
  }

  formatDate(date: string): string {
    return dayjs(date).format('DD/MM/YYYY');
  }

  formatHour(date: string): string {
    return dayjs(date).format('HH:mm');
  }
}