import { CourseOffered } from "./../course-offered";
import { SectionapiService } from "./../sectionapi.service";
import { FacultyapiService } from "./../facultyapi.service";
import { CourseapiService } from "./../courseapi.service";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CourseOfferedapiService } from "../course-offeredapi.service";
import { BatchapiService } from "../batchapi.service";
import { Router } from "@angular/router";
import { CreateCourseOfferedComponent } from "../create-course-offered/create-course-offered.component";
import { UpdateCourseOfferedComponent } from "../update-course-offered/update-course-offered.component";
import { CourseOfferedDetailsComponent } from "../course-offered-details/course-offered-details.component";

@Component({
  selector: "app-course-offered",
  templateUrl: "./course-offered.component.html",
  styleUrls: ["./course-offered.component.css"],
})
export class CourseOfferedComponent {
  title = "List of CourseOffered";

  coursesOffered = [];
  finalCoursesOffered = [];

  sectionOne = true;
  sectionTwo = false;
  sectionThree = false;
  one = "";
  two = "";
  three = "";
  dash: String;

  constructor(
    private api: CourseOfferedapiService,
    private batchApi: BatchapiService,
    private courseApi: CourseapiService,
    private facultyApi: FacultyapiService,
    private sectionApi: SectionapiService,
    private router: Router
  ) {
    this.getCoursesOffered();
  }

  getCoursesOffered = async () => {
    this.api.getAllCoursesOffered().subscribe(
      (data) => {
        this.coursesOffered = data;
        let courseOfferObject;
        let courseObject;
        let batchObject;
        let sectionObject;
        let facultyObject;

        this.coursesOffered.forEach(async (courseOffer) => {
          let tempCourseOffer = {
            id: Number,
            term: String,
            year: String,
            batch: String,
            section: String,
            course: String,
            faculty: String,
          };
          tempCourseOffer.id = courseOffer.id;
          tempCourseOffer.term = courseOffer.ofr_term;
          tempCourseOffer.year = courseOffer.ofr_year;

          let idArrays = [
            courseOffer.batchName,
            courseOffer.sectionName,
            courseOffer.courseID,
            courseOffer.facultyID,
          ];

          let i = 0;

          let promises = idArrays.map((id) => {
            if (i === 0) {
              i++;
              return this.batchApi.getOneBatch(id).toPromise();
            } else if (i === 1) {
              i++;
              return this.sectionApi.getOneSection(id).toPromise();
            } else if (i === 2) {
              i++;
              return this.courseApi.getOneCourse(id).toPromise();
            } else if (i === 3) {
              i++;
              return this.facultyApi.getOneFaculty(id).toPromise();
            }
          });

          let results = await Promise.all(promises);
          console.log("courseOffered details..", results);
          tempCourseOffer.batch = results[0][0].batchName;
          tempCourseOffer.section = results[1][0].sectionName;
          this.dash = ", ";
          tempCourseOffer.course =
            results[2][0].courseCode + this.dash + results[2][0].crs_title;
          this.dash = " ";
          tempCourseOffer.faculty =
            results[3][0].fac_firstName +
            this.dash +
            results[3][0].fac_lastName;

          this.finalCoursesOffered.push(tempCourseOffer);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getPromiseDatas = (idArrays) => {};

  deleteCourseOffered = (courseOfferedID) => {
    console.log("delete id: ", courseOfferedID);
    this.finalCoursesOffered = this.finalCoursesOffered.filter(
      (courseOffered) => courseOffered.id !== courseOfferedID
    );

    // this.api.deleteCourseOffered(courseOfferedID).subscribe(
    //   data => {
    //     console.log('deleted CourseOffered Id:', data)
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  };

  stepOne() {
    this.sectionTwo = true;
    this.sectionOne = true;
  }

  stepTwo() {
    this.sectionThree = true;
    this.sectionOne = true;
    this.sectionTwo = true;
  }

  stepThree() {
    this.sectionThree = false;
    this.sectionTwo = false;
    this.sectionOne = false;
  }

  CreatecourseOffered() {
    this.router.navigate(["addcourseOffered"]);
  }

  courseOfferedDetails(courseOfferedID) {
    this.router.navigate(["courseOffereddetails", courseOfferedID]);
  }

  updateCourseOffered(courseOfferedID, course) {
    this.router.navigate(["updatecourseOffered", courseOfferedID, course]);
  }
}
