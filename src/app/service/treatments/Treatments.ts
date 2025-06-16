import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Treatments } from "../../model/Treatments";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'

})

export class TreatmentsService {

  urlBase: string = 'http://localhost:3000/clinica_dental';

  constructor(private http:HttpClient) { }


  buscarTreatments(): Observable<Treatments[]> {
    const url: string = `${this.urlBase}/tratamientos`;

    return this.http.get<Treatments[]>(url);
  }


  createTreatment(treatment: Treatments): Observable<Treatments> {
    return this.http.post<Treatments>(`${this.urlBase}/tratamientos`, treatment);


   }



    }

