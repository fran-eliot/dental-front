import { HttpClient } from '@angular/common/http';
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

}
