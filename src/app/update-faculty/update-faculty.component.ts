import { Component, OnInit } from "@angular/core";
import { Faculty } from "../faculty";
import { ActivatedRoute, Router } from "@angular/router";
import { FacultyapiService } from "../facultyapi.service";
import { DepartmentapiService } from "../departmentapi.service";

@Component({
  selector: "app-update-faculty",
  templateUrl: "./update-faculty.component.html",
  styleUrls: ["./update-faculty.component.css"],
})
export class UpdateFacultyComponent implements OnInit {
  id: number;
  faculty: Faculty;
  departments: any = [];

  constructor(
    private route: ActivatedRoute,
    private facultyService: FacultyapiService,
    private router: Router,
    private api: DepartmentapiService
  ) {
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

  ngOnInit() {
    this.faculty = new Faculty();

    this.id = this.route.snapshot.params["id"];
    this.facultyService.getFacultyByFacultyID(this.id).subscribe(
      (data) => {
        console.log(data);
        this.faculty = data;
      },
      (error) => console.log(error)
    );
  }

  updateFaculty() {
    console.log("faculty..", this.faculty[0]);
    this.facultyService.updateFaculty(this.faculty[0]).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    this.faculty = new Faculty();
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(["/faculty"]);
  }
}
