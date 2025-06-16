import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCitaDentistaComponent } from './detalle-cita-dentista.component';

describe('DetalleCitaDentistaComponent', () => {
  let component: DetalleCitaDentistaComponent;
  let fixture: ComponentFixture<DetalleCitaDentistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleCitaDentistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleCitaDentistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
