import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialCitasPacienteModalComponent } from './historial-citas-paciente-modal.component';

describe('HistorialCitasPacienteModalComponent', () => {
  let component: HistorialCitasPacienteModalComponent;
  let fixture: ComponentFixture<HistorialCitasPacienteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialCitasPacienteModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorialCitasPacienteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
