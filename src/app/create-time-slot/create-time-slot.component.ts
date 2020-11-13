import { TimeSlotapiService } from '../time-slotapi.service';
import { TimeSlot } from '../time-slot';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-time-slot',
  templateUrl: './create-time-slot.component.html',
  styleUrls: ['./create-time-slot.component.css'],
  providers: [TimeSlotapiService]
})
export class CreateTimeSlotComponent {

  timeSlots = [{tst_day: ''}];
  TimeSlot;

  submitted = false;

  constructor(private timeSlotService: TimeSlotapiService, private router: Router)
  {
    this.TimeSlot = {timeSlotID: '', tst_day: '', tst_duration: '', tst_type: ''};
  }

  createTimeSlot = () => {
    this.timeSlotService.createTimeSlot(this.TimeSlot).subscribe(
      data => {
        this.timeSlots.push(data);
      },
      error => {
        console.log(error);
      }
    );

    this.submitted = false;
    this.gotoList();
  }

    onSubmit() {
    this.submitted = true;
    this.createTimeSlot();
  }

  gotoList() {
    this.router.navigate(['/timeSlot']);
  }
}
