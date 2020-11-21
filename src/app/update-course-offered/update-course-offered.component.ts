import { UpdateCourseOffered } from "./../updateCourseOffered";
import { ProgramapiService } from "./../programapi.service";
import { SectionapiService } from "./../sectionapi.service";
import { CourseOffered } from "./../course-offered";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CourseOfferedapiService } from "../course-offeredapi.service";
import { CourseapiService } from "../courseapi.service";
import { BatchapiService } from "../batchapi.service";
import { FacultyapiService } from "../facultyapi.service";

@Component({
  selector: "app-update-course-offered",
  templateUrl: "./update-course-offered.component.html",
  styleUrls: ["./update-course-offered.component.css"],
  providers: [CourseOfferedapiService],
})
export class UpdateCourseOfferedComponent implements OnInit {
  courseOfferedUpdate: any;
  id: number;
  dash: String;
  courseOfferedInfo: any;
  updateableCourseOffered: any;
  courseOffered: any;
  courses: any = [];
  batches: any = [];
  faculties: any = [];
  loaded = false;
  programs = [];
  sections = [{ sectionName: "A" }, { sectionName: "B" }, { sectionName: "C" }];

  constructor(
    private api: CourseOfferedapiService,
    private programApi: ProgramapiService,
    private courseApi: CourseapiService,
    private batchApi: BatchapiService,
    private sectionApi: SectionapiService,
    private facultyApi: FacultyapiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courseOfferedInfo = CourseOffered;
    this.id = this.route.snapshot.params["id"];
    this.courseOfferedUpdate = new UpdateCourseOffered();
    this.updateableCourseOffered = {
      id: Number,
      term: String,
      year: String,
      course: String,
      program: String,
      batch: String,
      section: String,
      faculty: String,
    };
    this.getCourseOffered(this.id);
    this.getCourses();
    this.getPrograms();
    this.getBatches();
    this.getSections();
    this.getFaculties();
  }

  getCourseOffered = async (courseOfferedId) => {
    this.api.getOneCourseOffered(courseOfferedId).subscribe(async (data) => {
      this.courseOffered = data[0];
      this.courseOfferedInfo.term = this.courseOffered.ofr_term;
      this.courseOfferedInfo.year = this.courseOffered.ofr_year;
      this.courseOfferedInfo.id = this.courseOffered.id;

      this.updateableCourseOffered.term = this.courseOffered.ofr_term;
      this.updateableCourseOffered.year = this.courseOffered.ofr_year;
      this.updateableCourseOffered.id = this.courseOffered.id;

      let idArrays = [
        this.courseOffered.batchName,
        this.courseOffered.sectionName,
        this.courseOffered.courseID,
        this.courseOffered.facultyID,
        data[0].programID,
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
        } else if (i === 4) {
          i++;
          console.log("programCode..", id);
          return this.programApi.getOneProgram(id).toPromise();
        }
      });

      let results = await Promise.all(promises);

      this.updateableCourseOffered.batch = results[0][0].batchName;
      this.updateableCourseOffered.section = results[1].sectionName;
      this.dash = ", ";
      this.updateableCourseOffered.course =
        results[2][0].courseCode + this.dash + results[2][0].crs_title;
      this.dash = " ";
      this.updateableCourseOffered.faculty =
        results[3][0].fac_firstName + this.dash + results[3][0].fac_lastName;
      this.updateableCourseOffered.program = results[4][0].pro_name;
      console.log("updateable offer..", this.updateableCourseOffered);

      this.courseOfferedInfo.batch = results[0][0].batchName;
      this.courseOfferedInfo.section = results[1].sectionName;
      this.dash = ", ";
      this.courseOfferedInfo.course =
        results[2][0].courseCode + this.dash + results[2][0].crs_title;
      this.dash = " ";
      this.courseOfferedInfo.faculty =
        results[3][0].fac_firstName + this.dash + results[3][0].fac_lastName;
      this.courseOfferedInfo.program = results[4][0].pro_name;
      console.log("updated...", this.courseOfferedInfo.program);
      this.loaded = true;
      // this.batchApi
      //   .getOneBatch(this.courseOffered.batchName)
      //   .subscribe((data) => {
      //     this.courseOfferedInfo.batch = data[0].batchName;
      //     console.log("courseOffered..", this.courseOffered[0].sectionName);
      //     this.sectionApi
      //       .getOneSection(this.courseOffered[0].sectionName)
      //       .subscribe((data) => {
      //         this.courseOfferedInfo.section = data.sectionName;
      //         this.courseApi
      //           .getOneCourse(this.courseOffered[0].courseID)
      //           .subscribe((data) => {
      //             this.dash = ", ";
      //             this.courseOfferedInfo.course =
      //               data[0].courseCode + this.dash + data[0].crs_title;
      //             this.facultyApi
      //               .getOneFaculty(this.courseOffered[0].facultyID)
      //               .subscribe((data) => {
      //                 this.dash = " ";
      //                 this.courseOfferedInfo.faculty =
      //                   data[0].fac_firstName +
      //                   this.dash +
      //                   data[0].fac_lastName;
      //                 this.programApi
      //                   .getOneProgram(this.courseOffered[0].programID)
      //                   .subscribe((data) => {
      //                     this.courseOfferedInfo.program = data[0].pro_name;
      //                     console.log(
      //                       "courseOffered..",
      //                       this.courseOfferedInfo.section
      //                     );
      //                   });
      //               });
      //           });
      //       });
      //   });
    });
  };

  getPrograms = () => {
    this.programApi.getAllPrograms().subscribe((data) => {
      this.programs = data;
    });
  };

  getCourses = () => {
    this.courseApi.getAllCourses().subscribe((data) => {
      //console.log("courses", data);
    });
  };

  getBatches = () => {
    this.batchApi.getAllBatches().subscribe(
      (data) => {
        this.batches = data;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getSections = () => {
    this.sectionApi.getAllSections().subscribe((data) => {
      //console.log("sections..", data);
    });
  };

  getFaculties = () => {
    this.facultyApi.getAllFaculties().subscribe(
      (data) => {
        this.faculties = data;
        console.log("facluties..", this.faculties);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  ngOnInit() {
    this.courseOffered = new CourseOffered();

    this.courseOfferedUpdate = new UpdateCourseOffered();

    this.id = this.route.snapshot.params["id"];

    this.courseOfferedUpdate = {};
    //console.log(this.courseOfferedUpdate)

    this.api.getOneCourseOffered(this.id).subscribe(
      (data) => {
        console.log(data);
        this.courseOffered = data;
      },
      (error) => console.log(error)
    );
  }

  updateCourseOffered() {
    this.courseOfferedUpdate = {
      id: 4,
      ofr_term: "Spring",
      ofr_year: 2020,
      program: "115",
      course: 3,
      batch: 5,
      section: 5,
      faculty: 6,
    };

    this.api.updateCourseOffered(this.courseOfferedUpdate).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    // this.courseOffered = new CourseOffered();
    // this.gotoList();
  }

  gotoList() {
    this.router.navigate(["/courseOffered"]);
  }
}
