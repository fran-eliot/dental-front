import { Component, OnInit } from '@angular/core';
import { ProfessionalService } from '../../../service/professional/professional.service';
import { Professional } from '../../../model/Professional';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-update-professionals',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-professionals.component.html',
  styleUrl: './update-professionals.component.css'
})
export class UpdateProfessionalsComponent implements OnInit {

  professionals: Professional[];
  editIndex: number | null = null;

  constructor(
      private readonly professionalsService:ProfessionalService
    ){}

  ngOnInit(): void {
    this.getProfessionals();
  }

  editar(index: number) {
    this.editIndex = index;
  }

  getProfessionals(){
    this.professionalsService.getProfessionals()
    .subscribe ( data => {
      this.professionals = data;
      console.log("Profesionales", this.professionals);
    })
  }

  updateProfessionals(){
    if (this.editIndex !== null) {
      const updated = this.professionals[this.editIndex];
      this.professionalsService.updateProfessionals(updated.id_professionals, updated)
        .subscribe(() => {
          this.editIndex = null;
        });
    }
  }
}
