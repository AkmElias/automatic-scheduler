import { RoutineapiService } from '../routineapi.service';
import { Routine } from '../routine';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseOfferedapiService } from '../course-offeredapi.service';
import { RoomapiService } from '../roomapi.service';
import { ExamapiService } from '../examapi.service';
import { TimeSlotapiService } from '../time-slotapi.service';

@Component({
  selector: 'app-update-routine',
  templateUrl: './update-routine.component.html',
  styleUrls: ['./update-routine.component.css'],
  providers: [RoutineapiService]
})
export class UpdateRoutineComponent implements OnInit {

id: number;
routine: Routine;
coursesOffered: any = [];
rooms: any = [];
exams: any = [];
timeSlots: any = [];

constructor(
  private routineService: RoutineapiService,  private api: CourseOfferedapiService,
  private roomService: RoomapiService, private examService: ExamapiService,
  private timeslotService: TimeSlotapiService, private router: Router, private route: ActivatedRoute)

{
  this.getCoursesOffered();
  this.getRooms();
  this.getExams();
  this.getTimeSlots();
}

getCoursesOffered = () => {
  this.api.getAllCoursesOffered().subscribe(
    data => {
      this.coursesOffered = data;
    },
    error => {
      console.log(error);
    }
  );
}

getRooms = () => {
  this.roomService.getAllRooms().subscribe(
    data => {
      this.rooms = data;
    },
    error => {
      console.log(error);
    }
  );
}

getExams = () => {
  this.examService.getAllExams().subscribe(
    data => {
      this.exams = data;
    },
    error => {
      console.log(error);
    }
  );
}

getTimeSlots = () => {
  this.timeslotService.getAllTimeSlots().subscribe(
    data => {
      this.timeSlots = data;
    },
    error => {
      console.log(error);
    }
  );
}

  ngOnInit() {
    this.routine = new Routine();

    this.id = this.route.snapshot.params['id'];

    this.routineService.getOneRoutine(this.id)
      .subscribe(data => {
        console.log(data)
        this.routine = data;
      }, error => console.log(error));
  }

  updateRoutine() {
    this.routineService.updateRoutine(this.routine)
      .subscribe(data => console.log(data), error => console.log(error));
    this.routine = new Routine();
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(['/routine']);
  }

}
