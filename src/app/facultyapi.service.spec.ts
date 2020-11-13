import { TestBed } from '@angular/core/testing';

import { FacultyapiService } from './facultyapi.service';

describe('FacultyapiService', () => {
  let service: FacultyapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultyapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
