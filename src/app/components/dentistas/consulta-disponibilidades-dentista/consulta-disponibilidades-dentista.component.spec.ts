import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDisponibilidadesDentistaComponent } from './consulta-disponibilidades-dentista.component';

describe('ConsultaDisponibilidadesDentistaComponent', () => {
  let component: ConsultaDisponibilidadesDentistaComponent;
  let fixture: ComponentFixture<ConsultaDisponibilidadesDentistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaDisponibilidadesDentistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaDisponibilidadesDentistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
