import {CreateRoutineapiService } from '../createroutineapi.service';
import { Routine } from '../routine';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentapiService } from '../departmentapi.service';
import { FacultyapiService } from '../facultyapi.service';
import { BatchapiService } from '../batchapi.service';
import { CourseapiService } from '../courseapi.service';
import { RoomapiService } from '../roomapi.service';
import { TimeSlotapiService } from '../time-slotapi.service';

@Component({
  selector: 'app-create-create-routine',
  templateUrl: './create-create-routine.component.html',
  styleUrls: ['./create-create-routine.component.css'],
  providers: [CreateRoutineapiService]
})
export class CreateCreateRoutineComponent {

  id: number;
  createRoutines = [{createRoutineID: ''}];
  CreateRoutine;
  departments: any = [];
  faculties: any = [];
  courses: any = [];
  rooms: any = [];
  batches: any = [];
  timeSlots: any = [];

  submitted = false;

  constructor(
    private routineService: CreateRoutineapiService,  private departmentapi: DepartmentapiService,
    private facultyapi: FacultyapiService, private api: CourseapiService, private batchapi: BatchapiService,
    private roomService: RoomapiService, private timeslotService: TimeSlotapiService, private router: Router)

  {
    this.CreateRoutine = {createCoutineID: '', dpt_code: '', fac_shortName: '', batch: '',
    courseCode: '', crs_shortName: '', roomCode: '', day: '', duration: ''};

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

  createCreateRoutine = () => {
    this.routineService.createCreateRoutine(this.CreateRoutine).subscribe(
      data => {
        this.createRoutines.push(data);
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
    this.createCreateRoutine();
  }

  gotoList() {
    this.router.navigate(['/createRoutine']);
  }
}
