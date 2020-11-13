import {CreateRoutineapiService } from '../createroutineapi.service';
import { CreateRoutine } from '../create-routine';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentapiService } from '../departmentapi.service';
import { FacultyapiService } from '../facultyapi.service';
import { BatchapiService } from '../batchapi.service';
import { CourseapiService } from '../courseapi.service';
import { RoomapiService } from '../roomapi.service';
import { TimeSlotapiService } from '../time-slotapi.service';

@Component({
  selector: 'app-update-create-routine',
  templateUrl: './update-create-routine.component.html',
  styleUrls: ['./update-create-routine.component.css'],
  providers: [CreateRoutineapiService]
})
export class UpdateCreateRoutineComponent implements OnInit {

  id: number;
  createRoutine: CreateRoutine;
  departments: any = [];
  faculties: any = [];
  courses: any = [];
  rooms: any = [];
  batches: any = [];
  timeSlots: any = [];

constructor(
  private createRoutineService: CreateRoutineapiService,  private departmentapi: DepartmentapiService,
  private facultyapi: FacultyapiService, private api: CourseapiService, private batchapi: BatchapiService,
  private roomService: RoomapiService, private timeslotService: TimeSlotapiService, private router: Router,
  private route: ActivatedRoute)

{
  this.getFaculties();
  this.getDepartments();
  this.getBatches();
  this.getCourses();
  this.getRooms();
  this.getTimeSlots();
}

getFaculties = () => {
  this.facultyapi.getAllFaculties().subscribe(
    data => {
      this.faculties = data;
    },
    error => {
      console.log(error);
    }
  );
}

getDepartments = () => {
  this.departmentapi.getAllDepartments().subscribe(
    data => {
      this.departments = data;
    },
    error => {
      console.log(error);
    }
  );
}

getBatches = () => {
  this.batchapi.getAllBatches().subscribe(
    data => {
      this.batches = data;
    },
    error => {
      console.log(error);
    }
  );
}

getCourses = () => {
  this.api.getAllCourses().subscribe(
    data => {
      this.courses = data;
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
    this.createRoutine = new CreateRoutine();

    this.id = this.route.snapshot.params['id'];

    this.createRoutineService.getOneCreateRoutine(this.id)
      .subscribe(data => {
        console.log(data)
        this.createRoutine = data;
      }, error => console.log(error));
  }

  updateCreateRoutine() {
    this.createRoutineService.updateCreateRoutine(this.createRoutine)
      .subscribe(data => console.log(data), error => console.log(error));
    this.createRoutine = new CreateRoutine();
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(['/createRoutine']);
  }

}
