import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentsDashboardComponent } from './treatments-dashboard.component';

describe('TreatmentsDashboardComponent', () => {
  let component: TreatmentsDashboardComponent;
  let fixture: ComponentFixture<TreatmentsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreatmentsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreatmentsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
