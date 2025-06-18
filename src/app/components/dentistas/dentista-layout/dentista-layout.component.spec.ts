import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistaLayoutComponent } from './dentista-layout.component';

describe('DentistaLayoutComponent', () => {
  let component: DentistaLayoutComponent;
  let fixture: ComponentFixture<DentistaLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DentistaLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DentistaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
