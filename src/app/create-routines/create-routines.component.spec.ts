import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoutinesComponent } from './create-routines.component';

describe('CreateRoutinesComponent', () => {
  let component: CreateRoutinesComponent;
  let fixture: ComponentFixture<CreateRoutinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRoutinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoutinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
