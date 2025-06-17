import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as dayjsLib from 'dayjs';
const dayjs = dayjsLib.default;

@Component({
  selector: 'app-dentist-agenda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dentist-agenda.component.html',
  styleUrl: './dentist-agenda.component.css'
})
export class DentistAgendaComponent implements OnInit {
  today = dayjs();
  week: { date: Date; appointments: any[] }[] = [];

  ngOnInit(): void {
    this.generateWeekAgenda();
  }

  generateWeekAgenda() {
    const startOfWeek = this.today.startOf('week').add(1, 'day'); // Lunes
    for (let i = 0; i < 5; i++) {
      const date = startOfWeek.add(i, 'day');
      this.week.push({
        date: date.toDate(),
        appointments: this.getMockAppointments(date),
      });
    }
  }

  isToday(date: Date): boolean {
    return dayjs(date).isSame(this.today, 'day');
  }

  getMockAppointments(date): any[] {
    // Simulación de datos, se sustituirá por servicio real
    if (date.day() === 1) {
      return [
        { time: '09:00', patientName: 'Pedro López', treatment: 'Limpieza' },
        { time: '11:00', patientName: 'Lucía Díaz', treatment: 'Empaste' },
      ];
    } else if (date.day() === 3) {
      return [
        { time: '10:00', patientName: 'Sergio Ruiz', treatment: 'Extracción' },
      ];
    }
    return [];
  }
}

