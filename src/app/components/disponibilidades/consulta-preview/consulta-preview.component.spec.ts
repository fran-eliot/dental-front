import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPreviewComponent } from './consulta-preview.component';

describe('ConsultaPreviewComponent', () => {
  let component: ConsultaPreviewComponent;
  let fixture: ComponentFixture<ConsultaPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
