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
  getCoursesByProgram = () => {
    this.courseApi.getCoursesByProgram(this.selectedProgram).subscribe(
      (data) => {
        this.courses = data;
        console.log("courses by program..", data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getBatchesByProgram = () => {
    this.getCoursesByProgram();
    this.batchApi.getBatchesByProgram(this.selectedProgram).subscribe(
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
      // course filtering because by batch section automaticaly changes every time..
      let batchAndSection = {
        batch: this.selectedBatch,
        section: this.selectedSection,
      };
      this.courseOfferedService
        .getAllCourseOfferedToBatchAndSection(batchAndSection)
        .subscribe((data) => {
          let allreadyOfferedCoursesArrayOfObjects = data;
          let allreadyOfferedCoursesArray = [];
          allreadyOfferedCoursesArrayOfObjects.forEach((element) => {
            allreadyOfferedCoursesArray.push(element.courseID);
          });
          console.log("alrdofrcrses..", allreadyOfferedCoursesArray);
          this.getRemainingCourses(allreadyOfferedCoursesArray);
        });
    });
  };

  sectionSelected = () => {
    let batchAndSection = {
      batch: this.selectedBatch,
      section: this.selectedSection,
    };
    //console.log("batch id and section..", batchAndSection);
    this.courseOfferedService
      .getAllCourseOfferedToBatchAndSection(batchAndSection)
      .subscribe((data) => {
        let allreadyOfferedCoursesArrayOfObjects = data;
        let allreadyOfferedCoursesArray = [];
        allreadyOfferedCoursesArrayOfObjects.forEach((element) => {
          allreadyOfferedCoursesArray.push(element.courseID);
        });
        console.log("alrdofrcrses..", allreadyOfferedCoursesArray);
        this.getRemainingCourses(allreadyOfferedCoursesArray);
      });
    this.courseLoaded = true;
  };

  getRemainingCourses = (allreadyOfferedCoursesArray) => {
    for (var i = 0; i < allreadyOfferedCoursesArray.length; i++) {
      this.courses = this.courses.filter(
        (course) => course.id != allreadyOfferedCoursesArray[i]
      );
    }
  };

  courseSelected = () => {
    if (
      this.batchLoaded == true &&
      this.sectionLoaded == true &&
      this.courseLoaded == true &&
      this.facultyLoaded == true
    ) {
      console.log("all loaded");
      this.allLoaded = true;
    }
  };

  facultySelected = () => {
    this.facultyLoaded = true;
    if (
      this.batchLoaded == true &&
      this.sectionLoaded == true &&
      this.courseLoaded == true &&
      this.facultyLoaded == true
    ) {
      console.log("all loaded");
      this.allLoaded = true;
    }
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
    let courseOffered = {
      term: this.selectedTerm,
      year: this.selectedYear,
      program: this.selectedProgram,
      batch: this.selectedBatch,
      section: this.selectedSection,
      course: this.selectedCourse,
      faculty: this.selectedFaculty,
    };

    this.courseOfferedService.createCourseOffered(courseOffered).subscribe(
      (data) => {
        console.log("added course offered ...", data);
      },
      (error) => {
        console.log(error);
      }
    );

    this.gotoList();
  };

  gotoList() {
    this.router.navigate(["/courseOffered"]);
  }
}
