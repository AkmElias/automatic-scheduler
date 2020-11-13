import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimeSlotapiService } from '../time-slotapi.service';
import { Router } from '@angular/router';
import { CreateTimeSlotComponent } from '../create-time-slot/create-time-slot.component';
import { UpdateTimeSlotComponent } from '../update-time-slot/update-time-slot.component';
import { TimeSlotDetailsComponent } from '../time-slot-details/time-slot-details.component';

@Component({
  selector: 'app-time-slot',
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.css'],
  providers: [TimeSlotapiService]
})
export class TimeSlotComponent  {

title = 'List of TimeSlot';

timeSlots = [{tst_day: 'test'}];
selectedTimeSlot;

constructor(private api: TimeSlotapiService, private router: Router) {

  setTimeout(() => {
    this.getTimeSlots();
  }, 500);

  this.getTimeSlots();
  this.selectedTimeSlot = {timeSlotID: '-1', tst_day: 'test', tst_duration: '', tst_type: ''};
}
getTimeSlots = () => {
  this.api.getAllTimeSlots().subscribe(
    data => {
      this.timeSlots = data;
    },
    error => {
      console.log(error);
    }
  );
}
timeSlotClicked = (timeSlot) => {
  this.api.getOneTimeSlot(timeSlot.timeSlotID).subscribe(
    data => {
      this.selectedTimeSlot = data;
    },
    error => {
      console.log(error);
    }
  );
}
updateTimeSlot = () => {
  this.api.updateTimeSlot(this.selectedTimeSlot).subscribe(
    data => {
      this.getTimeSlots();
    },
    error => {
      console.log(error);
    }
  );
}
createTimeSlot = () => {
  this.api.createTimeSlot(this.selectedTimeSlot).subscribe(
    data => {
      this.timeSlots.push(data);
    },
    error => {
      console.log(error);
    }
  );
}
deleteTimeSlot = () => {
  this.api.deleteTimeSlot(this.selectedTimeSlot.timeSlotID).subscribe(
    data => {
      this.getTimeSlots();
    },
    error => {
      console.log(error);
    }
  );
}

CreatetimeSlot(){
  this.router.navigate(['addtimeSlot']);
}

timeSlotDetails(timeSlotID){
  this.router.navigate(['timeSlotdetails', timeSlotID]);
}

UpdatetimeSlot(timeSlotID){
  this.router.navigate(['updatetimeSlot', timeSlotID]);
}

}
