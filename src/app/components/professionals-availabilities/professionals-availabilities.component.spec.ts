import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalsAvailabilitiesComponent } from './professionals-availabilities.component';

describe('ProfessionalsAvailabilitiesComponent', () => {
  let component: ProfessionalsAvailabilitiesComponent;
  let fixture: ComponentFixture<ProfessionalsAvailabilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalsAvailabilitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalsAvailabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
