import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCourseOfferedComponent } from './update-course-offered.component';

describe('UpdateCourseOfferedComponent', () => {
  let component: UpdateCourseOfferedComponent;
  let fixture: ComponentFixture<UpdateCourseOfferedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCourseOfferedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCourseOfferedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
