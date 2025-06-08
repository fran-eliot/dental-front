import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorDisponibilidadesComponent } from './selector-disponibilidades.component';

describe('SelectorDisponibilidadesComponent', () => {
  let component: SelectorDisponibilidadesComponent;
  let fixture: ComponentFixture<SelectorDisponibilidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectorDisponibilidadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectorDisponibilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
