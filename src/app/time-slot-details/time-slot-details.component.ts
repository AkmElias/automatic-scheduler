import { TimeSlot } from '../time-slot';
import { Component, OnInit, Input } from '@angular/core';
import { TimeSlotapiService } from '../time-slotapi.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-time-slot-details',
  templateUrl: './time-slot-details.component.html',
  styleUrls: ['./time-slot-details.component.css'],
  providers: [TimeSlotapiService]
})
export class TimeSlotDetailsComponent implements OnInit {

  id: number;
  timeSlot: TimeSlot;

  constructor(private route: ActivatedRoute,private router: Router, private timeSlotService: TimeSlotapiService) { }

  ngOnInit() {
    this.timeSlot = new TimeSlot();

    this.id = this.route.snapshot.params['id'];

    this.timeSlotService.getOneTimeSlot(this.id)
      .subscribe(data => {
        console.log(data)
        this.timeSlot = data;
      }, error => console.log(error));
  }

// list(){
//   this.router.navigate(['timeSlotlist']);
// }

TimeSlotlist(){
  this.router.navigate(['timeSlot']);
}

}
