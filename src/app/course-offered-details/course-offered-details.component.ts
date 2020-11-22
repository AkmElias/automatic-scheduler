import { ProgramapiService } from "./../programapi.service";
import { CourseOffered } from "./../course-offered";
import { Component, OnInit, Input } from "@angular/core";
import { CourseOfferedapiService } from "../course-offeredapi.service";
import { Router, ActivatedRoute } from "@angular/router";
import { SectionapiService } from "./../sectionapi.service";
import { FacultyapiService } from "./../facultyapi.service";
import { CourseapiService } from "./../courseapi.service";
import { BatchapiService } from "../batchapi.service";

@Component({
  selector: "app-course-offered-details",
  templateUrl: "./course-offered-details.component.html",
  styleUrls: ["./course-offered-details.component.css"],
  providers: [CourseOfferedapiService],
})
export class CourseOfferedDetailsComponent implements OnInit {
  id: number;
  courseOfferedInfo: any;
  courseOffered: any;
  dash: String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseOfferedService: CourseOfferedapiService,
    private programApi: ProgramapiService,
    private batchApi: BatchapiService,
    private courseApi: CourseapiService,
    private facultyApi: FacultyapiService,
    private sectionApi: SectionapiService
  ) {
    this.courseOfferedInfo = CourseOffered;
    this.id = this.route.snapshot.params["id"];
    this.getCourseOfferedDetails(this.id);
  }

  ngOnInit() {}

  getCourseOfferedDetails(courseOfferedId) {
    this.courseOfferedService
      .getOneCourseOffered(courseOfferedId)
      .subscribe(async (data) => {
        this.courseOffered = data[0];
        this.courseOfferedInfo.term = this.courseOffered.ofr_term;
        this.courseOfferedInfo.year = this.courseOffered.ofr_year;
        this.courseOfferedInfo.id = this.courseOffered.id;
        console.log("courseOffered..", this.courseOffered);

        let idArrays = [
          this.courseOffered.programID,
          this.courseOffered.batchName,
          this.courseOffered.sectionName,
          this.courseOffered.courseID,
          this.courseOffered.facultyID,
        ];

        let i = 0;

        let promises = idArrays.map((id) => {
          if (i === 0) {
            i++;
            return this.programApi.getOneProgram(id).toPromise();
          } else if (i === 1) {
            i++;
            return this.batchApi.getOneBatch(id).toPromise();
          } else if (i === 2) {
            i++;
            return this.sectionApi.getOneSection(id).toPromise();
          } else if (i === 3) {
            i++;
            return this.courseApi.getOneCourse(id).toPromise();
          } else if (i === 4) {
            i++;
            return this.facultyApi.getOneFaculty(id).toPromise();
          }
        });

        let results = await Promise.all(promises);
        this.courseOfferedInfo.program = results[0][0].pro_name;
        this.courseOfferedInfo.batch = results[1][0].batchName;
        this.courseOfferedInfo.section = results[2].sectionName;
        this.dash = ", ";
        this.courseOfferedInfo.course =
          results[3][0].courseCode + this.dash + results[3][0].crs_title;
        this.dash = " ";
        this.courseOfferedInfo.faculty =
          results[4][0].fac_firstName + this.dash + results[4][0].fac_lastName;
      });
  }

  gotoList() {
    this.router.navigate(["courseOffered"]);
  }
}
