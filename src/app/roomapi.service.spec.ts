import { TestBed } from '@angular/core/testing';

import { RoomapiService } from './roomapi.service';

describe('RoomapiService', () => {
  let service: RoomapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
