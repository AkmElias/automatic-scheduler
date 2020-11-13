import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoutineDetailsComponent } from './create-routine-details.component';

describe('CreateRoutineDetailsComponent', () => {
  let component: CreateRoutineDetailsComponent;
  let fixture: ComponentFixture<CreateRoutineDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRoutineDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoutineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
