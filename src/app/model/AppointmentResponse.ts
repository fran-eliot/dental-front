export interface AppointmentResponse {
  id_reserva: number;
  paciente: string;
  profesional: string;
  tratamiento: string;
  fecha_cita: string;
  hora_inicio: string;
  hora_fin: string; 
  periodo: string;
  estado: string;
  duracion: number;
  motivo_cancelacion?: string;
  creado_por?: string;
}
