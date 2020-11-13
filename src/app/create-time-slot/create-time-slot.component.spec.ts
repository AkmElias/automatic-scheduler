import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTimeSlotComponent } from './create-time-slot.component';

describe('CreateTimeSlotComponent', () => {
  let component: CreateTimeSlotComponent;
  let fixture: ComponentFixture<CreateTimeSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTimeSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTimeSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
