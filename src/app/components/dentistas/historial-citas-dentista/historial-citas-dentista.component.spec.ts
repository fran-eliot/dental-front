import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialCitasDentistaComponent } from './historial-citas-dentista.component';

describe('HistorialCitasDentistaComponent', () => {
  let component: HistorialCitasDentistaComponent;
  let fixture: ComponentFixture<HistorialCitasDentistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialCitasDentistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorialCitasDentistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
