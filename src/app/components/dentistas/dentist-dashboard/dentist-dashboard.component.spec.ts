import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistDashboardComponent } from './dentist-dashboard.component';

describe('DentistDashboardComponent', () => {
  let component: DentistDashboardComponent;
  let fixture: ComponentFixture<DentistDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DentistDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DentistDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
