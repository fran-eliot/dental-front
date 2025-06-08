import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDisponibilidadesComponent } from './consulta-disponibilidades.component';

describe('ConsultaDisponibilidadesComponent', () => {
  let component: ConsultaDisponibilidadesComponent;
  let fixture: ComponentFixture<ConsultaDisponibilidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaDisponibilidadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaDisponibilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
