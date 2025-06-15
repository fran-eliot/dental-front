import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalAppointmentsModalComponent } from './historical-appointments-modal.component';

describe('HistoricalAppointmentsModalComponent', () => {
  let component: HistoricalAppointmentsModalComponent;
  let fixture: ComponentFixture<HistoricalAppointmentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricalAppointmentsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricalAppointmentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
