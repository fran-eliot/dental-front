export class Reserva {
  id_reservas: number;
  patient_id: number;
  professional_id: number;
  treatments_id: number;
  date_appointments: string;
  time_appointments: string;
  status_reservas: string;
  cancellation_reason_appointments?: string;
  created_by_appointments?: string;

  constructor(id_reservas?: number, patient_id?: number, professional_id?: number, date_appointments?: string, time_appointments?: string, status_reservas?: string, cancellation_reason_appointments?:string, created_by_appointmentes?:string) {
    this.id_reservas = id_reservas || 0;
    this.professional_id = professional_id || 0;
    this.date_appointments = date_appointments || '';
    this.time_appointments = time_appointments || '';
    this.patient_id = patient_id || 0;
    this.status_reservas = status_reservas || 'PENDING';
    this.cancellation_reason_appointments = cancellation_reason_appointments || '';
    this.created_by_appointments = created_by_appointmentes || 'admin';
  }
}
