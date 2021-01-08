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
  tempCourses: any = [];
  batches: any = [];
  sections: any = [];
  faculties: any = [];
  programs: any = [];
  coursesAndFaculties: any = [];
  courseAndFaculty: {};
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
    this.selectedYear = "2021";
    this.selectedProgram = "";
    this.selectedBatch = null;
    this.selectedSection = null;
    this.selectedCourse = null;
    this.selectedFaculty = null;
  }

  getPrograms() {
    this.programApi.getAllPrograms().subscribe((data) => {
      this.programs = data;
      console.log("programs", data);
    });
  }

  getCoursesByProgram = () => {
    this.coursesAndFaculties = [];
    this.courseApi.getCoursesByProgram(this.selectedProgram).subscribe(
      (data) => {
        this.courses = data;
        this.tempCourses = data;
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
        this.sectionLoaded = false;
        this.courseLoaded = false;
        this.allLoaded = false;
        this.coursesAndFaculties = [];
        this.selectedBatch = null;
        this.selectedSection = null;
        this.selectedCourse = null;
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
      this.courseLoaded = false;
      this.allLoaded = false;
      this.coursesAndFaculties = [];
      this.selectedSection = null;
      this.selectedCourse = null;
      this.selectedFaculty = null;
    });
  };

  sectionSelected = () => {
    let batchAndSection = {
      batch: this.selectedBatch,
      section: this.selectedSection,
    };
    console.log("batch id and section..", batchAndSection);
    this.courseOfferedService
      .getAllCourseOfferedToBatchAndSection(batchAndSection)
      .subscribe((data) => {
        let allreadyOfferedCoursesArrayOfObjects = data;
        let allreadyOfferedCoursesArray = [];

        allreadyOfferedCoursesArrayOfObjects.forEach((element) => {
          allreadyOfferedCoursesArray.push(element.courseID);
        });
        this.selectedCourse = null;
        this.selectedFaculty = null;
        this.allLoaded = false;
        this.coursesAndFaculties = [];

        console.log("alreadyofrcrses..", allreadyOfferedCoursesArray);
        this.getRemainingCourses(allreadyOfferedCoursesArray);
        this.courseLoaded = true;
      });
  };

  getRemainingCourses = (allreadyOfferedCoursesArray) => {
    this.courses = this.tempCourses;
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
        this.facultyLoaded = true;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  addCourseFaculty = () => {
    if (this.selectedCourse === null || this.selectedFaculty) {
      alert("Required field missing!!");
      return;
    }
    let courseAdded = false;
    this.coursesAndFaculties.forEach((cf) => {
      if (cf.course == this.selectedCourse) {
        courseAdded = true;
        alert("You have added this course allready!");
        return;
      }
    });

    if (courseAdded) return;

    let crsFclt = {
      course: this.selectedCourse,
      faculty: this.selectedFaculty,
      courseName: "",
      facultyName: "",
    };

    this.courses.forEach((course) => {
      if (course.id == this.selectedCourse) {
        crsFclt.courseName = course.crs_title;
        return;
      }
    });

    this.faculties.forEach((faculty) => {
      if (faculty.id == this.selectedFaculty) {
        crsFclt.facultyName =
          faculty.fac_firstName + " " + faculty.fac_lastName;
        return;
      }
    });

    //filtering added course from total reamining courses

    this.coursesAndFaculties.push(crsFclt);

    this.coursesAndFaculties.forEach((element) => {
      this.courses = this.courses.filter(
        (course) => course.id != element.course
      );
    });

    this.allLoaded = true;
    // this.courses = this.courses.filter(
    //   (course) => course.id != this.selectedCourse
    // );

    this.selectedCourse = null;
    this.selectedFaculty = null;
    console.log("crs array..", this.coursesAndFaculties);
  };

  deleteCFfromRow = (course) => {
    this.coursesAndFaculties = this.coursesAndFaculties.filter(
      (cfname) => cfname.course !== course
    );
    if (this.coursesAndFaculties.length <= 0) {
      this.allLoaded = false;
    }
    console.log("crs array..", this.coursesAndFaculties);
  };

  createCourseOffered = () => {
    //alert("Are you sure to proceed!")

    if (confirm("Are you sure to proceed!")) {
    } else {
      return;
    }

    this.coursesAndFaculties.forEach((cf) => {
      if (!cf.course) return;
      let courseOffered = {
        term: this.selectedTerm,
        year: this.selectedYear,
        program: this.selectedProgram,
        batch: this.selectedBatch,
        section: this.selectedSection,
        course: cf.course,
        faculty: cf.faculty,
      };

      this.courseOfferedService.createCourseOffered(courseOffered).subscribe(
        (data) => {
          console.log("added course offered ...", data);
          this.coursesAndFaculties = [];
          this.allLoaded = false;
          this.sectionLoaded = false;
          this.batchLoaded = false;
          this.courseLoaded = false;
          this.facultyLoaded = false;
          this.selectedProgram = "";
        },
        (error) => {
          console.log(error);
        }
      );
    });

    //this.gotoList();
  };

  gotoList() {
    this.router.navigate(["/courseOffered"]);
  }
}
