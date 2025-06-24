import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Treatment } from '../../model/Treatment';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
urlBase: string = 'http://localhost:3000/treatments';

  constructor(private http:HttpClient) { }


  buscarTreatments(): Observable<Treatment[]> {
    const url: string = `${this.urlBase}/all`;

    return this.http.get<Treatment[]>(url);
  }

  createTreatment(treatment: Treatment): Observable<Treatment> {
    return this.http.post<Treatment>(`${this.urlBase}/alta`, treatment);
  }

  updateTreatment(id_treatment: number, treatment: Treatment): Observable<Treatment> {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Treatment>(`${this.urlBase}/actualizar-tratamiento/${id_treatment}`, treatment,  { headers });
  }
}
