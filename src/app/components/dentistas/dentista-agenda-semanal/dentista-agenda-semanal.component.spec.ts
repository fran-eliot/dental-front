import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistaAgendaSemanalComponent } from './dentista-agenda-semanal.component';

describe('DentistaAgendaSemanalComponent', () => {
  let component: DentistaAgendaSemanalComponent;
  let fixture: ComponentFixture<DentistaAgendaSemanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DentistaAgendaSemanalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DentistaAgendaSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
