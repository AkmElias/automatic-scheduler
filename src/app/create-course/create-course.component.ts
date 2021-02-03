import { AuthService } from "./../auth.service";
import { CourseapiService } from "../courseapi.service";
import { Course } from "../course";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProgramapiService } from "../programapi.service";

@Component({
  selector: "app-create-course",
  templateUrl: "./create-course.component.html",
  styleUrls: ["./create-course.component.css"],
  providers: [CourseapiService],
})
export class CreateCourseComponent {
  courses = [{ pro_name: "" }];
  Course;
  programs: any = [];
  credits = [3, 1.5, 2, 4];
  submitted = false;

  constructor(
    private courseService: CourseapiService,
    private router: Router,
    private api: ProgramapiService,
    private authService: AuthService
  ) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl("/");
    }
    this.Course = {
      courseID: "",
      courseCode: "",
      crs_title: "",
      crs_shortName: "",
      crs_category: "",
      programCode: "",
      crs_credit: 0,
    };
    this.getPrograms();
  }

  getPrograms = () => {
    this.api.getAllPrograms().subscribe(
      (data) => {
        this.programs = data;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  createCourse = () => {
    this.courseService.createCourse(this.Course).subscribe(
      (data) => {
        this.courses.push(data);
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
    this.createCourse();
  }

  gotoList() {
    this.router.navigate(["/course"]);
  }
}
