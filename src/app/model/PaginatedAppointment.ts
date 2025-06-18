import { AppointmentResponse } from "./AppointmentResponse";

export interface PaginatedAppointment {
  data: AppointmentResponse[];
  total: number;
  page: number;
  pageSize: number;
}
