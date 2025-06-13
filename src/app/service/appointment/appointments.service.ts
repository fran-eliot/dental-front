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

  getAppointments(filters: {professional_id: number, date_appointments: string}): Observable<any[]> {
    const params: any = {};

    if (filters.professional_id) {
      params.professional_id = filters.professional_id.toString();
    }
    if (filters.date_appointments) {
      params.date_appointments = filters.date_appointments;
    }

    return this.http.get<any[]>(`${this.apiUrlAppointments}/reservas`, { params });
  }
}
