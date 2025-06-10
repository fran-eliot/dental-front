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
  
  constructor(private http:HttpClient) {}

  getProfessionals():Observable<Professional[]>{
    return this.http.get<Professional[]>(this.urlAllProfessionals);
  }

  updateProfessionals(id_professionals:number, professional: Professional):Observable<Professional>{
    return this.http.put<Professional>(`${this.urlUpdateProfessionals}/${id_professionals}`, professional);
  }
}
