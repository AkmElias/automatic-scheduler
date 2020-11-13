import { RoutineapiService } from '../routineapi.service';
import { Routine } from '../routine';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseOfferedapiService } from '../course-offeredapi.service';
import { RoomapiService } from '../roomapi.service';
import { ExamapiService } from '../examapi.service';
import { TimeSlotapiService } from '../time-slotapi.service';

@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.component.html',
  styleUrls: ['./create-routine.component.css'],
  providers: [RoutineapiService]
})
export class CreateRoutineComponent {

  id: number;
  routines = [{routineID: ''}];
  Routine;
  coursesOffered: any = [];
  rooms: any = [];
  exams: any = [];
  timeSlots: any = [];

  submitted = false;

  constructor(
    private routineService: RoutineapiService,  private api: CourseOfferedapiService,
    private roomService: RoomapiService, private examService: ExamapiService,
    private timeslotService: TimeSlotapiService, private router: Router)

  {
    this.Routine = {routineID: '', courseOfferedID: '', roomCode: '', examID: '', timeSlotID: '' };
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

  createRoutine = () => {
    this.routineService.createRoutine(this.Routine).subscribe(
      data => {
        this.routines.push(data);
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
    this.createRoutine();
  }

  gotoList() {
    this.router.navigate(['/routine']);
  }
}
