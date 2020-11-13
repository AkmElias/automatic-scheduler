import { TestBed } from '@angular/core/testing';

import { BatchapiService } from './batchapi.service';

describe('BatchapiService', () => {
  let service: BatchapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
