import { TestBed } from '@angular/core/testing';

import { AvailabitlityService } from './availabitlity.service';

describe('AvailabitlityService', () => {
  let service: AvailabitlityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailabitlityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
