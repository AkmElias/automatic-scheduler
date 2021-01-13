import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CourseapiService } from "../courseapi.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Course } from "../course";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent {
  title = "List of Course";
  searchText;

  courses = [{ id: 1, crs_title: "" }];
  selectedCourse;

  programs = [{ pro_name: "test" }];
  selectedProgram;

  id: number;
  course: Course;
  isLoggedIn: boolean;
  constructor(
    private api: CourseapiService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getCourses();
    this.selectedCourse = {
      courseID: "-1",
      courseCode: "test",
      crs_title: "",
      crs_shortName: "",
      crs_category: "",
      programCode: "",
    };
  }

  ngOnInit() {
    this.course = new Course();

    this.id = this.route.snapshot.params["id"];

    if (!this.id) {
      this.getCourses();
    } else {
      this.api.getOneCourse(this.id).subscribe(
        (data) => {
          console.log(data);
          this.courses = data;
        },
        (error) => console.log(error)
      );
    }
  }

  getCourses = () => {
    this.api.getAllCourses().subscribe(
      (data) => {
        this.courses = data;
        console.log("id..", data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  deleteCourse = (courseID) => {
    this.courses = this.courses.filter((course) => course.id != courseID);
    // this.api.deleteCourse(courseID).subscribe(
    //   (data) => {
    //     this.getCourses();
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  };

  gotoCourseOffered() {
    this.router.navigate(["courseOffered"]);
  }

  Createcourse() {
    this.router.navigate(["addcourse"]);
  }

  courseDetails(courseID) {
    console.log("id..", courseID);
    this.router.navigate(["coursedetails", courseID]);
  }

  Updatecourse(courseID) {
    this.router.navigate(["updatecourse", courseID]);
  }
}
