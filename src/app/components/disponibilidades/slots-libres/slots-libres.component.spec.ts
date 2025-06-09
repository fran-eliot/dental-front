import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotsLibresComponent } from './slots-libres.component';

describe('SlotsLibresComponent', () => {
  let component: SlotsLibresComponent;
  let fixture: ComponentFixture<SlotsLibresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlotsLibresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlotsLibresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
