import { TestBed } from '@angular/core/testing';

import { CourseOfferedapiService } from './course-offeredapi.service';

describe('CourseOfferedapiService', () => {
  let service: CourseOfferedapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseOfferedapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
