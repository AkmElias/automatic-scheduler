import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseOfferedDetailsComponent } from './course-offered-details.component';

describe('CourseOfferedDetailsComponent', () => {
  let component: CourseOfferedDetailsComponent;
  let fixture: ComponentFixture<CourseOfferedDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseOfferedDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseOfferedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
