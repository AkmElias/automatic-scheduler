import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTimeSlotComponent } from './update-time-slot.component';

describe('UpdateTimeSlotComponent', () => {
  let component: UpdateTimeSlotComponent;
  let fixture: ComponentFixture<UpdateTimeSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTimeSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTimeSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
