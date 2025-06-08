import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDisponibilidadesComponent } from './lista-disponibilidades.component';

describe('ListaDisponibilidadesComponent', () => {
  let component: ListaDisponibilidadesComponent;
  let fixture: ComponentFixture<ListaDisponibilidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDisponibilidadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaDisponibilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
