import { Component, OnInit } from '@angular/core';
import { TimeSlot } from '../time-slot';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeSlotapiService } from '../time-slotapi.service';

@Component({
  selector: 'app-update-time-slot',
  templateUrl: './update-time-slot.component.html',
  styleUrls: ['./update-time-slot.component.css'],
  providers: [TimeSlotapiService]
})
export class UpdateTimeSlotComponent implements OnInit {

  id: number;
  timeSlot: TimeSlot;

  constructor(private route: ActivatedRoute,private router: Router, private timeSlotService: TimeSlotapiService){ }


  ngOnInit() {
    this.timeSlot = new TimeSlot();

    this.id = this.route.snapshot.params['id'];

    this.timeSlotService.getOneTimeSlot(this.id)
      .subscribe(data => {
        console.log(data)
        this.timeSlot = data;
      }, error => console.log(error));
  }

  updateTimeSlot() {
    this.timeSlotService.updateTimeSlot(this.timeSlot)
      .subscribe(data => console.log(data), error => console.log(error));
    this.timeSlot = new TimeSlot();
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(['/timeSlot']);
  }

}
