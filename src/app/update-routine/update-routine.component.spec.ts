import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRoutineComponent } from './update-routine.component';

describe('UpdateRoutineComponent', () => {
  let component: UpdateRoutineComponent;
  let fixture: ComponentFixture<UpdateRoutineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRoutineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
