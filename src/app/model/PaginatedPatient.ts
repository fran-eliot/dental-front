import { Patient } from "./Patient";

export interface PaginatedPatient {
  data: Patient[];
  page: number;
  pageSize: number;
  total: number;
}
