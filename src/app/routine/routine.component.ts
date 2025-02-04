import { ProgramapiService } from "./../programapi.service";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RoutineapiService } from "../routineapi.service";
import { Router } from "@angular/router";
import { CreateRoutineComponent } from "../create-routine/create-routine.component";
import { UpdateRoutineComponent } from "../update-routine/update-routine.component";
import { RoutineDetailsComponent } from "../routine-details/routine-details.component";
import { Title } from "@angular/platform-browser";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-routine",
  templateUrl: "./routine.component.html",
  styleUrls: ["./routine.component.css"],
})
export class RoutineComponent {
  routines = [{ id: 0, title: "", batchAndSection: "" }];
  tempRoutines = [{ id: 0, title: "", batchAndSection: "" }];
  batchAndSections = new Set();

  cseRoutines = new Set();
  loadRoutine = false;
  selectedRoutine;
  termYearProgram = "";
  batchAndSectionSearch = "";
  //search fields
  Term: String;
  Year: Number;
  Years = [];
  Day: String;
  Days = [];
  searchText = "";
  Program: String;
  programs: [];
  isLoggedIn: boolean;

  constructor(
    private routineApi: RoutineapiService,
    private programApi: ProgramapiService,
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.Term = "Spring";
    this.Year = 2020;
    this.Program = "CSE";
    this.getRoutines();
    this.initialize();
  }

  getRoutines = async () => {
    this.routines = await this.routineApi
      .getRoutinesByTermYearProgram(
        `${this.Program}, ${this.Term}, ${this.Year}`
      )
      .toPromise();
    this.tempRoutines = this.routines;
    this.loadRoutine = true;
    this.tempRoutines.forEach((routine) => {
      this.cseRoutines.add(routine.title);
      this.batchAndSections.add(routine.batchAndSection);
    });
  };

  getRoutinesByProgramAndSemister = async () => {
    this.termYearProgram = `${this.Program}, ${this.Term}, ${this.Year}`;
    this.cseRoutines = new Set();
    this.batchAndSections = new Set();

    alert(this.termYearProgram);
    this.routines = await this.routineApi
      .getRoutinesByTermYearProgram(this.termYearProgram)
      .toPromise();
    this.tempRoutines = this.routines;
    this.tempRoutines.forEach((routine) => {
      this.cseRoutines.add(routine.title);
      this.batchAndSections.add(routine.batchAndSection);
    });
    console.log("batch after search.", this.batchAndSections);
  };

  getBatchAndSectionsFromRoutineByProgram = () => {};

  batchAndSectionSelected = (bas) => {
    console.log("bas..", bas);
    this.tempRoutines = this.routines.filter((routine) => {
      return routine.batchAndSection === bas;
    });
  };

  showRoutine = async (title) => {
    this.loadRoutine = true;
    this.tempRoutines = this.routines.filter(
      (routine) => routine.title === title
    );
    console.log("selected title..", this.routines);
  };

  deleteRoutine = (routineId) => {
    this.tempRoutines = this.tempRoutines.filter(
      (routine) => routine.id != routineId
    );
    // this.routineApi.deleteRoutine(routineId).subscribe(
    //   (data) => {
    //     console.log("deleted routine: ", data);
    //     // this.getRoutines();
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  };

  createRoutine() {
    this.router.navigate(["addroutine"]);
  }

  routineDetails(routineID) {
    this.router.navigate(["routinedetails", routineID]);
  }

  Updateroutine(routineID) {
    this.router.navigate(["updateroutine", routineID]);
  }

  initialize = async () => {
    this.selectedRoutine = {
      routineID: "-1",
      courseOfferedID: "",
      roomCode: "",
      examID: "",
      timeSlotID: "",
    };
    this.Years = [2020, 2021, 2022, 2023, 2024, 2025];
    this.Day = "SATURDAY";

    this.Days = [
      "SATURDAY",
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
    ];
    this.programs = await this.getPrograms();
    console.log("programs..", this.programs);
  };

  getPrograms = () => {
    return this.programApi.getAllPrograms().toPromise();
  };
}
