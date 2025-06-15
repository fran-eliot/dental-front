import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsDashboardComponent } from './appointments-dashboard.component';

describe('AppointmentsDashboardComponent', () => {
  let component: AppointmentsDashboardComponent;
  let fixture: ComponentFixture<AppointmentsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
