import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimpiezaDisponibilidadesComponent } from './limpieza-disponibilidades.component';

describe('LimpiezaDisponibilidadesComponent', () => {
  let component: LimpiezaDisponibilidadesComponent;
  let fixture: ComponentFixture<LimpiezaDisponibilidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LimpiezaDisponibilidadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LimpiezaDisponibilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
