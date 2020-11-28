import { Course } from "../course";
import { Component, OnInit, Input } from "@angular/core";
import { CourseapiService } from "../courseapi.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-course-details",
  templateUrl: "./course-details.component.html",
  styleUrls: ["./course-details.component.css"],
})
export class CourseDetailsComponent implements OnInit {
  id: number;
  course: Course;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseapiService
  ) {}

  ngOnInit() {
    this.course = new Course();

    this.id = this.route.snapshot.params["id"];
    console.log("id..", this.id);
    this.courseService.getCourseByCourseID(this.id).subscribe(
      (data) => {
        console.log(data);
        this.course = data;
      },
      (error) => console.log(error)
    );
  }

  // list(){
  //   this.router.navigate(['courselist']);
  // }

  Courselist() {
    this.router.navigate(["course"]);
  }
}
