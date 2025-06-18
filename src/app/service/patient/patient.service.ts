import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../../model/Patient';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  urlBase: string = "http://localhost:3000/patients";

  constructor(private http: HttpClient) {}

    getPatients(): Observable<Patient[]> {
      return this.http.get<Patient[]>(`${this.urlBase}/all`);
    }

    updatePatient(id_patient: number, patient: Patient): Observable<Patient> {
      return this.http.put<Patient>(`${this.urlBase}/actualizacion/${id_patient}`, patient);
    }
    createPatient(patient: Patient): Observable<Patient> {
      return this.http.post<Patient>(`${this.urlBase}/creacion`, patient);
    }



}
