import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCreateRoutineComponent } from './create-create-routine.component';

describe('CreateCreateRoutineComponent', () => {
  let component: CreateCreateRoutineComponent;
  let fixture: ComponentFixture<CreateCreateRoutineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCreateRoutineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCreateRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
