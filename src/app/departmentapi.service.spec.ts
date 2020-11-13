import { TestBed } from '@angular/core/testing';

import { DepartmentapiService } from './departmentapi.service';

describe('DepartmentapiService', () => {
  let service: DepartmentapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
