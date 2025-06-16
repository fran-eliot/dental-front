import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistaAgendaDiariaComponent } from './dentista-agenda-diaria.component';

describe('DentistaAgendaDiariaComponent', () => {
  let component: DentistaAgendaDiariaComponent;
  let fixture: ComponentFixture<DentistaAgendaDiariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DentistaAgendaDiariaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DentistaAgendaDiariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
