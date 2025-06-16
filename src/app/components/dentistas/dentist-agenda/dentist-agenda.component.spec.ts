import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistAgendaComponent } from './dentist-agenda.component';

describe('DentistAgendaComponent', () => {
  let component: DentistAgendaComponent;
  let fixture: ComponentFixture<DentistAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DentistAgendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DentistAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
