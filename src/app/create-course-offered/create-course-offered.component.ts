import { CourseOfferedapiService } from "../course-offeredapi.service";
import { CourseOffered } from "../course-offered";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProgramapiService } from "./../programapi.service";
import { SectionapiService } from "./../sectionapi.service";
import { CourseapiService } from "../courseapi.service";
import { BatchapiService } from "../batchapi.service";
import { FacultyapiService } from "../facultyapi.service";

@Component({
  selector: "app-create-course-offered",
  templateUrl: "./create-course-offered.component.html",
  styleUrls: ["./create-course-offered.component.css"],
  providers: [CourseOfferedapiService],
})
export class CreateCourseOfferedComponent {
  courseOffereds = [{ courseCode: "" }];
  CourseOffered;
  courses: any = [];
  batches: any = [];
  sections: any = [];
  faculties: any = [];
  programs: any = [];

  selectedTerm: String;
  selectedYear: String;
  selectedCourse: Number;
  selectedProgram: String;
  selectedBatch: Number;
  selectedSection: Number;
  selectedFaculty: Number;

  batchLoaded = false;
  sectionLoaded = false;
  courseLoaded = false;
  facultyLoaded = false;
  allLoaded = false;
  submitted = false;

  constructor(
    private courseOfferedService: CourseOfferedapiService,
    private programApi: ProgramapiService,
    private sectionApi: SectionapiService,
    private courseApi: CourseapiService,
    private batchApi: BatchapiService,
    private facultyApi: FacultyapiService,
    private router: Router
  ) {
    this.getPrograms();
    this.getCourses();
    this.getFaculties();

    this.selectedTerm = "Spring";
    this.selectedYear = "2018";
    this.selectedProgram = "";
    this.selectedBatch = 0;
    this.selectedSection = 0;
    this.selectedCourse = 0;
    this.selectedFaculty = 0;
  }

  getPrograms() {
    this.programApi.getAllPrograms().subscribe((data) => {
      this.programs = data;
      console.log("programs", data);
    });
  }
  getCourses = () => {
    this.courseApi.getAllCourses().subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getBatchesByProgram = (programCode) => {
    this.batchApi.getBatchesByProgram(programCode).subscribe(
      (data) => {
        this.batches = data;
        this.batchLoaded = true;
        console.log("batchesByProgram...", data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getSectionsByBatch = (batch) => {
    this.sectionApi.getSectionsByBatch(batch).subscribe((data) => {
      //console.log("sections..", data);
      this.sections = data;
      this.sectionLoaded = true;
    });
  };

  sectionSelected = () => {
    this.courseLoaded = true;
    this.allLoaded = true;
  };

  getFaculties = () => {
    this.facultyApi.getAllFaculties().subscribe(
      (data) => {
        this.faculties = data;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  createCourseOffered = () => {
    this.courseOfferedService.createCourseOffered(this.CourseOffered).subscribe(
      (data) => {
        this.courseOffereds.push(data);
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
    this.createCourseOffered();
  }

  gotoList() {
    this.router.navigate(["/courseOffered"]);
  }
}
