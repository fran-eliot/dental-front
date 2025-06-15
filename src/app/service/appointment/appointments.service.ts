import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professional } from '../../model/Professional';
import { Reserva } from '../../model/Reserva';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  apiUrlAppointments = 'http://localhost:3000/appointments';
  apiUrlProfessionals = 'http://localhost:3000/professionals';
  apiUrlHorasDisponibles = 'http://localhost:3000/disponibilidades';

  constructor(private http: HttpClient) {}

  //nos traemos los profesionales
  getProfessionals(): Observable<Professional[]> {
    return this.http.get<any[]>(`${this.apiUrlProfessionals}/all`);
  }

  //metodo para traer las reservas
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

  //metodo para crear nuevas reservas
  getnewAppointment(reserva:Reserva):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrlAppointments}/nuevaReserva`, reserva, {headers})
  }

  //nos traemos las horas disponibles
  getHorasDisponibles(profesionalId: number, fecha:string): Observable<string[]> {
  return this.http.get<string[]>(
    `${this.apiUrlAppointments}/${profesionalId}/${fecha}`
  );
}

}
