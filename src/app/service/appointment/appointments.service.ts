import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professional } from '../../model/Professional';
import { Appointment } from '../../model/Appoinment';
import { Patient } from '../../model/Patient';
import { Treatment } from '../../model/Treatment';
import { Slot } from '../../model/Slot';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  apiUrlAppointments = 'http://localhost:3000/appointments';
  apiUrlProfessionals = 'http://localhost:3000/professionals';
  apiUrlHorasDisponibles = 'http://localhost:3000/disponibilidades/slots-libres';
  apiUrlPatients = 'http://localhost:3000/patients';
  apiUrlTreatments = 'http://localhost:3000/treatments';

  constructor(private http: HttpClient) {}

  //nos traemos los profesionales
  getProfessionals(): Observable<Professional[]> {
    return this.http.get<any[]>(`${this.apiUrlProfessionals}/all`);
  }
  // Obtener todos los pacientes
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrlPatients}/all`);
  }

  // Obtener todos los tratamientos
  getTreatments(): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(`${this.apiUrlTreatments}/all`);
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
  postNewAppointment(reserva:Appointment):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrlAppointments}/nuevaReserva`, reserva, {headers})
  }

  //nos traemos las horas disponibles
  getHorasDisponibles(profesionalId: number, fecha:string): Observable<Slot[]> {
    return this.http.get<Slot[]>(
      `${this.apiUrlHorasDisponibles}/${profesionalId}/${fecha}`
    );
  }

  //Todas las reserva del historial filtradas por paciente
  getAllAppointementsByPatient(patients_id:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrlAppointments}/history/${patients_id}`);
  }
}
