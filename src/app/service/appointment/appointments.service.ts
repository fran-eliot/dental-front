import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professional } from '../../model/Professional';
import { Appointment } from '../../model/Appoinment';
import { Patient } from '../../model/Patient';
import { Treatment } from '../../model/Treatment';
import { Slot } from '../../model/Slot';
import { PaginatedAppointment } from '../../model/PaginatedAppointment';
import { AppointmentResponseDto } from '../../model/AppointmentResponseDto';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  apiUrlAppointments = 'http://localhost:3000/appointments';
  apiUrlProfessionals = 'http://localhost:3000/professionals';
  apiUrlHorasDisponibles = 'http://localhost:3000/disponibilidades/slots-libres';
  apiUrlPatients = 'http://localhost:3000/patients';
  apiUrlTreatments = 'http://localhost:3000/treatments';
  apiUrlReservasByDates = 'http://localhost:3000/appointments/reservas-por-fechas';

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

  //Obtener las reservas para verificar la si se puede hacer la reserva
  getAllAppointmentsComplete(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrlAppointments}/reservas/todas`);
  }

  //metodo para traer las reservas
  getAppointments(filters: {professional_id?: number, date_appointments?: string, page?: number, pageSize?: number}): Observable<PaginatedAppointment> {
    let params = new HttpParams();

    if (filters.professional_id) {
      params = params.set('professional_id', filters.professional_id.toString());
    }
    if (filters.date_appointments) {
      params = params.set('date_appointments', filters.date_appointments);
    }
    if (filters.page) {
      params = params.set('page', filters.page.toString());
    }
    if (filters.pageSize) {
      params = params.set('pageSize', filters.pageSize.toString());
    }

    return this.http.get<PaginatedAppointment>(`${this.apiUrlAppointments}/reservas`, { params });
  }

  //traer todas las reservas sin paginación(dentistas dashboard)
  getAppointmentsAll(filters: {professional_id?: number, date_appointments?: string}):Observable<any[]> {
    const params: any = {};
    if (filters.professional_id) {
      params.professional_id = filters.professional_id.toString();
    }
    if (filters.date_appointments) {
      params.date_appointments = filters.date_appointments;
    }
    return this.http.get<any[]>(`${this.apiUrlAppointments}/reservas/all`, { params });
  }

  getAppointmentsByDates(filters: {start_date: string, end_date: string, professional_id: number}): Observable<AppointmentResponseDto[]> {
    let params = new HttpParams();

    if (filters.start_date) {
      params = params.set('startDate', filters.start_date);
    }
    if (filters.end_date) {
      params = params.set('endDate', filters.end_date);
    }
    if (filters.professional_id) {
      params = params.set('professional_id', filters.professional_id.toString());
    }
    console.log('Params:', params.toString()); // Para depurar los parámetros

    return this.http.get<AppointmentResponseDto[]>(`${this.apiUrlReservasByDates}`, { params });
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
  getAllAppointementsByPatient(patients_id:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrlAppointments}/history/${patients_id}`);
  }

  //Actualizamos el status y el motivo de las reservas
  updateAppointmentStatus(id_appointments: number, updateData: { status_appointments: string, cancellation_reason_appointments?: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch<any>(
      `${this.apiUrlAppointments}/actualizar-estado/${id_appointments}`,
      updateData,
      { headers }
    );
  }
}
