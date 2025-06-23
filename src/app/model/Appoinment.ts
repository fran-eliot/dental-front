export class Appointment {
  id_appointments?: number;
  patient_id: number;
  professional_id: number;
  treatments_id: number;
  duration_minutes_appointments: number;
  slot_id: number;
  date_appointments: string;
  time_appointments?: string;
  status_appointments: string;
  cancellation_reason_appointments?: string;
  created_by_appointments?: string;

   //Estas son las propiedades que vienen del backend
  patient?: any;
  professional?: any;
  treatment?: any;
  slot?: any;

  constructor(
    patient_id: number,
    professional_id: number,
    treatments_id: number,
    duration_minutes_appointments: number,
    slot_id: number,
    date_appointments: string,
    id_appointments?: number,
    time_appointments?: string,
    status_appointments?: string,
    cancellation_reason_appointments?: string,
    created_by_appointments?: string
  ) {
    this.id_appointments = id_appointments || 0;
    this.patient_id = patient_id || 0;
    this.professional_id = professional_id || 0;
    this.treatments_id = treatments_id || 0;
    this.duration_minutes_appointments = duration_minutes_appointments || 0;
    this.slot_id = slot_id || 0;
    this.date_appointments = date_appointments || '';
    this.time_appointments = time_appointments || '';
    this.status_appointments= status_appointments || 'pendiente';
    this.cancellation_reason_appointments = cancellation_reason_appointments || '';
    this.created_by_appointments = created_by_appointments || 'admin';
  }
}
