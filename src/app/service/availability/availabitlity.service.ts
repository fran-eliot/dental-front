import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfessionalAvailabitity } from '../../model/ProfessionalAvailability';
import { Status } from '../../model/Status';
import { Slot } from '../../model/Slot';

@Injectable({
  providedIn: 'root'
})
export class AvailabitlityService {

  private readonly baseUrl = 'http://localhost:3000/disponibilidades';

  constructor(private http: HttpClient) { }

  getAvailabilities(professionalId: number, date: string): Observable<ProfessionalAvailabitity[]> {
    return this.http.get<ProfessionalAvailabitity[]>(`${this.baseUrl}/${professionalId}/${date}`);
  }

  updateStatus(id: number, status: Status): Observable<ProfessionalAvailabitity> {
    return this.http.patch<ProfessionalAvailabitity>(`${this.baseUrl}/${id}`, { status });
  }

  getFreeSlots(professionalId: number, date: string): Observable<Slot[]> {
    return this.http.get<Slot[]>(`${this.baseUrl}/slots-libres/${professionalId}/${date}`);
  }

  generateWeek(): Observable<any> {
    return this.http.post(`${this.baseUrl}/genera-semana`, {});
  }

  generateAvailabilitiesForMonth(dto: { month: number; year: number }):Observable<any> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/genera-mes`, dto);
  }

  cleanOld(beforeDate: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/limpieza/${beforeDate}`);
  }
}
