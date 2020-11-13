import { TestBed } from '@angular/core/testing';

import { RoutineapiService } from './routineapi.service';

describe('RoutineapiService', () => {
  let service: RoutineapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutineapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
