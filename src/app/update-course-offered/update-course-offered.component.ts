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
  course: String;
  dash: String;
  courseOfferedInfo: any;
  courseOffered: any;
  courses: any = [];
  batches: any = [];
  faculties: any = [];
  loaded = true;
  programs = [];
  selectedTerm: String;
  selectedYear: String;
  selectedCourse: Number;
  selectedProgram: String;
  selectedBatch: Number;
  selectedSection: Number;
  selectedFaculty: Number;
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
    this.course = this.route.snapshot.params["course"];
    console.log("course from route..", this.course);
    this.courseOfferedUpdate = new UpdateCourseOffered();

    this.getCourseOffered(this.id);
    this.getCourses();
    this.getPrograms();
    this.getFaculties();
  }

  getCourseOffered = async (courseOfferedId) => {
    this.api.getOneCourseOffered(courseOfferedId).subscribe(async (data) => {
      this.courseOffered = data[0];
      console.log("courseoffer..", this.courseOffered);
      this.courseOfferedInfo.term = this.courseOffered.ofr_term;
      this.courseOfferedInfo.year = this.courseOffered.ofr_year;
      this.courseOfferedInfo.id = this.courseOffered.id;

      this.selectedTerm = this.courseOffered.ofr_term;
      this.selectedYear = this.courseOffered.ofr_year;
      this.selectedCourse = 2;
      this.selectedProgram = data[0].programID;
      this.getBatchesByProgram(this.selectedProgram);
      this.selectedBatch = this.courseOffered.batchName;
      this.selectedSection = this.courseOffered.sectionName;
      this.getSectionsByBatch(this.selectedBatch);
      this.selectedFaculty = this.courseOffered.facultyID;
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

  getBatchesByProgram = (programCode) => {
    this.batchApi.getBatchesByProgram(programCode).subscribe(
      (data) => {
        this.batches = data;
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

  batchByProgram() {
    console.log("batch by programs");
  }

  updateCourseOffered() {
    
    if (confirm("Are you sure to proceed!")) {
    } else {
      return;
    }

    this.courseOfferedUpdate = {
      id: this.id,
      ofr_term: this.selectedTerm,
      ofr_year: this.selectedYear,
      program: this.selectedProgram,
      course: this.selectedCourse,
      batch: this.selectedBatch,
      section: this.selectedSection,
      faculty: this.selectedFaculty,
    };

    this.api.updateCourseOffered(this.courseOfferedUpdate).subscribe(
      (data) => console.log("updatedt course offered...!!", data),
      (error) => console.log(error)
    );
    alert("Course offered updated succesfully!!");
  }

  gotoList() {
    this.router.navigate(["/courseOffered"]);
  }
}
