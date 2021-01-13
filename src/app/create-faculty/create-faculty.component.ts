import { AuthService } from "./../auth.service";
import { FacultyapiService } from "../facultyapi.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DepartmentapiService } from "../departmentapi.service";

@Component({
  selector: "app-create-faculty",
  templateUrl: "./create-faculty.component.html",
  styleUrls: ["./create-faculty.component.css"],
})
export class CreateFacultyComponent {
  faculties = [{ fac_designation: "" }];
  faculty: any;
  departments: any = [];

  submitted = false;

  constructor(
    private facultyService: FacultyapiService,
    private authService: AuthService,
    private router: Router,
    private api: DepartmentapiService
  ) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl("/");
    }
    this.faculty = {
      fac_title: "",
      fac_firstName: "",
      fac_lastName: "",
      fac_shortName: "",
      fac_gender: "",
      fac_designation: "",
      DepartmentID: "",
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

  createFaculty = () => {
    this.facultyService.createFaculty(this.faculty).subscribe(
      (data) => {
        this.faculties.push(data);
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
    this.createFaculty();
  }

  gotoList() {
    this.router.navigate(["/faculty"]);
  }
}
