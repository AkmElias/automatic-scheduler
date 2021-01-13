import { AuthService } from "./../auth.service";
import { ProgramapiService } from "../programapi.service";
import { Program } from "../program";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DepartmentapiService } from "../departmentapi.service";

@Component({
  selector: "app-create-program",
  templateUrl: "./create-program.component.html",
  styleUrls: ["./create-program.component.css"],
  providers: [ProgramapiService],
})
export class CreateProgramComponent {
  programs = [{ pro_name: "" }];
  Program;
  departments: any = [];

  submitted = false;

  constructor(
    private programService: ProgramapiService,
    private router: Router,
    private api: DepartmentapiService,
    private authService: AuthService
  ) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl("/");
    }
    this.Program = {
      programCode: "",
      pro_name: "",
      pro_shortForm: "",
      DepartmentID: "",
      pro_type: "",
    };
    this.getDepartments();
  }

  getDepartments = () => {
    this.api.getAllDepartments().subscribe(
      (data) => {
        this.departments = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  createProgram = () => {
    this.programService.createProgram(this.Program).subscribe(
      (data) => {
        this.programs.push(data);
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
    this.createProgram();
  }

  gotoList() {
    this.router.navigate(["/program"]);
  }
}
