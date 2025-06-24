import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professional } from '../../model/Professional';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {
  urlAllProfessionals: string = "http://localhost:3000/professionals/all";
  urlUpdateProfessionals: string = "http://localhost:3000/professionals/actualizacion";
  urlGetProfessionalByIdUser: string = "http://localhost:3000/professionals/por-user";
  urlGetActiveProfessionals: string = "http://localhost:3000/professionals/activos";

  constructor(private http:HttpClient) {}

  getProfessionals():Observable<Professional[]>{
    return this.http.get<Professional[]>(this.urlAllProfessionals);
  }

  getActiveProfessionals(): Observable<Professional[]> {
    return this.http.get<Professional[]>(this.urlGetActiveProfessionals);
  }

  updateProfessionals(id_professionals:number, professional: Professional):Observable<Professional>{
    return this.http.put<Professional>(`${this.urlUpdateProfessionals}/${id_professionals}`, professional);
  }

  getProfessionalByIdUser(id_user: number): Observable<Professional> {
    const url: string = `${this.urlGetProfessionalByIdUser}/${id_user}`;
    console.log(url)
    return this.http.get<Professional>(url);
  }
}
