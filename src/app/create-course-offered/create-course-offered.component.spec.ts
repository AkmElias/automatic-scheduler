import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseOfferedComponent } from './create-course-offered.component';

describe('CreateCourseOfferedComponent', () => {
  let component: CreateCourseOfferedComponent;
  let fixture: ComponentFixture<CreateCourseOfferedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCourseOfferedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCourseOfferedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
