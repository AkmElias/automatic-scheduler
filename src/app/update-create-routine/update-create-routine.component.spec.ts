import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCreateRoutineComponent } from './update-create-routine.component';

describe('UpdateCreateRoutineComponent', () => {
  let component: UpdateCreateRoutineComponent;
  let fixture: ComponentFixture<UpdateCreateRoutineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCreateRoutineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCreateRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
