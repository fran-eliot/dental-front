import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialCitasPacienteComponent } from './historial-citas-paciente.component';

describe('HistorialCitasPacienteComponent', () => {
  let component: HistorialCitasPacienteComponent;
  let fixture: ComponentFixture<HistorialCitasPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialCitasPacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorialCitasPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
