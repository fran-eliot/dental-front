import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTreatmentsComponent } from './new-treatments.component';

describe('NewTreatmentsComponent', () => {
  let component: NewTreatmentsComponent;
  let fixture: ComponentFixture<NewTreatmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTreatmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewTreatmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
