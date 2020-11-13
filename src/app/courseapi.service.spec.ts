import { TestBed } from '@angular/core/testing';

import { CourseapiService } from './courseapi.service';

describe('CourseapiService', () => {
  let service: CourseapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
