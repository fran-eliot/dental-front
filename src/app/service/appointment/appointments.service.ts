import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professional } from '../../model/Professional';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  apiUrlAppointments = 'http://localhost:3000/appointments';
  apiUrlProfessionals = 'http://localhost:3000/professionals';

  constructor(private http: HttpClient) {}

  getProfessionals(): Observable<Professional[]> {
    return this.http.get<any[]>(`${this.apiUrlProfessionals}/all`);
  }

  getAppointments(professional_id: number, date_appointments: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlAppointments}/reservas`, {
      params: {
        professional_id: professional_id.toString(),
        date_appointments
      }
    });
  }
}
