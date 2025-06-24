import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedPatient } from '../../model/PaginatedPatient';
import { Observable } from 'rxjs';
import { Patient } from '../../model/Patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  apiUrlPatients = 'http://localhost:3000/patients';

  constructor(private http: HttpClient) { }

  //Nos traemos los pacientes
  searchPatients(term: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrlPatients}/search/${term}`);
  }

  /*getAllPatients(page: number, pageSize: number): Observable<PaginatedPatient> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    };
    return this.http.get<PaginatedPatient>(`${this.apiUrlPatients}/all`, { params });
  }*/

  //Actualizamos paciente por id
  updatePatient(id_patient: number, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrlPatients}/update/${id_patient}`, patient);
  }

  //Creamos nuevo paciente
  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrlPatients}/alta`, patient);
  }

}
