import { ProgramapiService } from "./../programapi.service";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RoutineapiService } from "../routineapi.service";
import { Router } from "@angular/router";
import { CreateRoutineComponent } from "../create-routine/create-routine.component";
import { UpdateRoutineComponent } from "../update-routine/update-routine.component";
import { RoutineDetailsComponent } from "../routine-details/routine-details.component";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-routine",
  templateUrl: "./routine.component.html",
  styleUrls: ["./routine.component.css"],
})
export class RoutineComponent {
  routines = [{ id: 0, title: "" }];
  tempRoutines = [{ id: 0, title: "" }];
  cseRoutines = new Set();
  loadRoutine = false;
  selectedRoutine;

  //search fields
  Term: String;
  Year: 2020;
  Years = [];
  Day: String;
  Days = [];
  searchText = "";
  Program: String;
  programs: [];

  constructor(
    private routineApi: RoutineapiService,
    private programApi: ProgramapiService,
    private router: Router
  ) {
    setTimeout(() => {
      this.getRoutines();
    }, 500);
    this.initialize();
  }
  getRoutines = () => {
    this.routineApi.getAllRoutines().subscribe(
      (data) => {
        this.routines = data;
        this.tempRoutines = data;
        this.routines.forEach((routine) => {
          this.cseRoutines.add(routine.title);
        });

        //console.log("routines...", data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getRoutinesByProgramAndSemister = () => {};

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
    this.Program = "CSE";
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
