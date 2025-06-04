import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfessionalsComponent } from './update-professionals.component';

describe('UpdateProfessionalsComponent', () => {
  let component: UpdateProfessionalsComponent;
  let fixture: ComponentFixture<UpdateProfessionalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProfessionalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateProfessionalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
