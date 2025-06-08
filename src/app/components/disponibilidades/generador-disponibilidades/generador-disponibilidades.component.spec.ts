import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneradorDisponibilidadesComponent } from './generador-disponibilidades.component';

describe('GeneradorDisponibilidadesComponent', () => {
  let component: GeneradorDisponibilidadesComponent;
  let fixture: ComponentFixture<GeneradorDisponibilidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneradorDisponibilidadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneradorDisponibilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
