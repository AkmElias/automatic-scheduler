import { TestBed } from '@angular/core/testing';

import { ProgramapiService } from './programapi.service';

describe('ProgramapiService', () => {
  let service: ProgramapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
