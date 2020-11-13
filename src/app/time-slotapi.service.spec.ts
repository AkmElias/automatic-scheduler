import { TestBed } from '@angular/core/testing';

import { TimeSlotapiService } from './time-slotapi.service';

describe('TimeSlotapiService', () => {
  let service: TimeSlotapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeSlotapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
