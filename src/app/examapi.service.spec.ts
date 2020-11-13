import { TestBed } from '@angular/core/testing';

import { ExamapiService } from './examapi.service';

describe('ExamapiService', () => {
  let service: ExamapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
