import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilidadesMensualesComponent } from './disponibilidades-mensuales.component';

describe('DisponibilidadesMensualesComponent', () => {
  let component: DisponibilidadesMensualesComponent;
  let fixture: ComponentFixture<DisponibilidadesMensualesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisponibilidadesMensualesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisponibilidadesMensualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
