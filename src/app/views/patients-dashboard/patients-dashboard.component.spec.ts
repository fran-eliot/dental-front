import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsDashboardComponent } from './patients-dashboard.component';

describe('PatientsDashboardComponent', () => {
  let component: PatientsDashboardComponent;
  let fixture: ComponentFixture<PatientsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
