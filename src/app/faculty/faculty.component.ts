import { Component, OnInit } from "@angular/core";
import { FacultyapiService } from "../facultyapi.service";
import { DepartmentapiService } from "../departmentapi.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Faculty } from "../faculty";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-faculty",
  templateUrl: "./faculty.component.html",
  styleUrls: ["./faculty.component.css"],
})
export class FacultyComponent {
  title = "List of Faculties";
  searchText;

  faculties = [{ id: 1, fac_shortName: "test" }];
  selectedFaculty;

  departments = [{ dpt_name: "test" }];
  selectedDepartment;

  id: number;
  faculty: Faculty;
  isLoggedIn: boolean;
  constructor(
    private api: FacultyapiService,
    private router: Router,
    private route: ActivatedRoute,
    private deptapi: DepartmentapiService,
    private authService: AuthService
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
    if(!this.isLoggedIn){
      this.router.navigateByUrl('/login');
    }
    // this.getFaculties();
    this.selectedFaculty = {
      facultyID: "-1",
      fac_title: "",
      fac_firstName: "",
      fac_lastName: "",
      fac_shortName: "test",
      fac_gender: "",
      fac_designation: "",
      DepartmentID: "",
    };
  }

  ngOnInit() {
    this.faculty = new Faculty();

    this.id = this.route.snapshot.params["id"];

    if (!this.id) {
      this.getFaculties();
    } else {
      this.api.getOneFaculty(this.id).subscribe(
        (data) => {
          console.log(data);
          this.faculties = data;
        },
        (error) => console.log(error)
      );
    }
  }

  getFaculties = () => {
    this.api.getAllFaculties().subscribe(
      (data) => {
        this.faculties = data;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  deleteFaculty = (facultyID) => {
    this.faculties = this.faculties.filter(
      (faculty) => faculty.id != facultyID
    );
    // this.api.deleteFaculty(facultyID).subscribe(
    //   data => {
    //     this.getFaculties();
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  };

  gotoCourseOffered() {
    this.router.navigate(["courseOffered"]);
  }

  Createfaculty() {
    this.router.navigate(["addfaculty"]);
  }

  facultyDetails(facultyID) {
    this.router.navigate(["facultydetails", facultyID]);
  }

  Updatefaculty(facultyID) {
    this.router.navigate(["updatefaculty", facultyID]);
  }
}
