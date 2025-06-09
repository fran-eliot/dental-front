import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotsLibresPreviewComponent } from './slots-libres-preview.component';

describe('SlotsLibresPreviewComponent', () => {
  let component: SlotsLibresPreviewComponent;
  let fixture: ComponentFixture<SlotsLibresPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlotsLibresPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlotsLibresPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
