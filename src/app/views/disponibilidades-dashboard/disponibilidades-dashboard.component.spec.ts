import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilidadesDashboardComponent } from './disponibilidades-dashboard.component';

describe('DisponibilidadesDashboardComponent', () => {
  let component: DisponibilidadesDashboardComponent;
  let fixture: ComponentFixture<DisponibilidadesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisponibilidadesDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisponibilidadesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
