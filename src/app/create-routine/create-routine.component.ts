import { ProgramapiService } from "./../programapi.service";
import { RoutineapiService } from "../routineapi.service";
import { Routine } from "../routine";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CourseOfferedapiService } from "../course-offeredapi.service";
import { RoomapiService } from "../roomapi.service";
import { TimeSlotapiService } from "../time-slotapi.service";

@Component({
  selector: "app-create-routine",
  templateUrl: "./create-routine.component.html",
  styleUrls: ["./create-routine.component.css"],
})
export class CreateRoutineComponent {
  id: number;
  Term: String;
  Year: Number;
  Years = [];
  Day: String;
  Days = [];
  Program: String;
  programs = [];
  firstStep = false;
  routines = [{ routineID: "" }];
  Routine;
  coursesOffered: any = [];
  rooms: any = [];
  exams: any = [];
  timeSlots: any = [];
  submitted = false;

  constructor(
    private routineService: RoutineapiService,
    private programApi: ProgramapiService,
    private api: CourseOfferedapiService,
    private roomService: RoomapiService,
    private timeslotService: TimeSlotapiService,
    private router: Router
  ) {
    this.Routine = {
      routineID: "",
      courseOfferedID: "",
      roomCode: "",
      examID: "",
      timeSlotID: "",
    };
    this.getPrograms();
    this.Term = "";
    this.Year = 2020;
    this.Years = [2020, 2021, 2022, 2023, 2024, 2025];
    this.Day = "";
    this.Days = [
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
    ];
    this.Program = "";
    this.getCoursesOffered();
    this.getRooms();
    this.getTimeSlots();
  }

  getPrograms = () => {
    this.programApi.getAllPrograms().subscribe((data) => {
      this.programs = data;
      console.log("programs: ", data);
    });
  };

  programSelected = () => {
    if (this.Program) {
      this.firstStep = true;
    }
  };

  addTermYearDayProgram = () => {
    alert(`${this.Program} ${this.Day} ${this.Term} ${this.Year} `);
  };

  getCoursesOffered = () => {
    this.api.getAllCoursesOffered().subscribe(
      (data) => {
        this.coursesOffered = data;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getRooms = () => {
    this.roomService.getAllRooms().subscribe(
      (data) => {
        this.rooms = data;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getTimeSlots = () => {
    this.timeslotService.getAllTimeSlots().subscribe(
      (data) => {
        this.timeSlots = data;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  createRoutine = () => {
    this.routineService.createRoutine(this.Routine).subscribe(
      (data) => {
        this.routines.push(data);
      },
      (error) => {
        console.log(error);
      }
    );

    this.submitted = false;
    this.gotoList();
  };

  onSubmit() {
    this.submitted = true;
    this.createRoutine();
  }

  gotoList() {
    this.router.navigate(["/routine"]);
  }
}
