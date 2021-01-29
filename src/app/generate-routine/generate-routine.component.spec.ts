import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateRoutineComponent } from './generate-routine.component';

describe('GenerateRoutineComponent', () => {
  let component: GenerateRoutineComponent;
  let fixture: ComponentFixture<GenerateRoutineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateRoutineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
