import { ProgramapiService } from "./../programapi.service";
import { Component, OnInit } from "@angular/core";
import { BatchapiService } from "../batchapi.service";
import { SectionapiService } from "../sectionapi.service";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { CourseOfferedapiService } from "../course-offeredapi.service";
import { CourseapiService } from "../courseapi.service";
import { FacultyapiService } from "../facultyapi.service";
import { RoomapiService } from "../roomapi.service";
import { TimeSlotapiService } from "../time-slotapi.service";

@Component({
  selector: "app-generate-routine",
  templateUrl: "./generate-routine.component.html",
  styleUrls: ["./generate-routine.component.css"],
})
export class GenerateRoutineComponent implements OnInit {
  id: number;
  Days = [];
  Day = "";
  rday = "MONDAY";
  time = "3.30pm to 4.50pm";
  tempRoutine = "";
  TimeSlots = [];
  TimeSlot: String;
  Programs = [];
  Program: String;
  Years = [];
  Term: String;
  Year: Number;
  Title: String;
  firstStepSubmitted: Boolean;
  Batch: Number;
  batches = [];
  Section: Number;
  sections = [];
  batchAndSectionId = {};
  Time: String;
  timeSlots = [];
  Course: Number;
  offeredCourses = [];
  availableCourses = [];
  courses = [];
  Faculty: Number;
  courseShortName: String;
  facultyShortName: String;
  Room: String;
  batchAndSection: String;
  courseAndFaculty: String;
  secondStepSubmitted = false;
  batchLoaded = false;
  sectionLoaded = false;
  timeSlotLoaded = false;
  roomLoaded = false;
  courseLoaded = false;
  secondStepLoaded = false;
  facultyIds = [];
  routines = [];
  idRoutines = [];

  Routine;
  coursesOffered: any = [];
  availableCourse = [];

  selectedCourseOffered: Number;
  rooms: any = [];
  exams: any = [];
  dayRoutineByProgram = [];
  routineRow = {};
  idRoutineRow = {};
  submitted = false;

  routinesFromDb = [];

  constructor(
    private programApi: ProgramapiService,
    private batchApi: BatchapiService,
    private sectionApi: SectionapiService,
    private courseApi: CourseapiService,
    private facultyApi: FacultyapiService,
    private roomApi: RoomapiService,
    private courseOfferedApi: CourseOfferedapiService,
    private roomService: RoomapiService,
    private authService: AuthService,
    private router: Router
  ) {
    this.firstStepSubmitted = false;
    this.Days = [
      "SATURDAY",
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
    ];
    this.TimeSlots = [
      "8.00am to 9.20am",
      "9.30am to 10.50am",
      "11.00am to 12.20pm",
      "12.30pm to 1.50pm",
      "2.00pm to 3.20pm",
      "3.30pm to 4.50pm",
    ];
    this.Years = [2020, 2021, 2022, 2023, 2024, 2025];
    this.Term = "Spring";
    this.Year = 2021;
    this.Program = "";
    this.Title = "";
    this.Batch = 0;
    this.Section = 0;
    this.batchAndSectionId = {};
    this.Faculty = null;
    this.Course = null;
    programApi.getAllPrograms().subscribe((data) => {
      this.Programs = data;
    });
  }

  programSelected = () => {
    console.log("selected..P..", this.Program);
    this.batchApi.getBatchesByProgram(this.Program).subscribe((data) => {
      this.batches = data;
      console.log("batches..", data);
    });
  };

  submitFirstStep = () => {
    if (this.Term && this.Year && this.Program) {
      this.firstStepSubmitted = true;

      this.Programs.filter((program) => {
        if (program.programCode === this.Program)
          this.Program = program.pro_shortForm;
      });
      this.Title = `${this.Program} ${this.Term} ${this.Year}`;
    } else {
      alert("Program not selected!");
    }
  };

  setDayAndTimeSlot = (day, time) => {
    this.Day = day;
    this.TimeSlot = time;
    console.log(`day: ${day} timeSlot: ${time} Program: ${this.Program}`);
    this.timeSlotLoaded = true;
  };

  batchSelected = (batchId) => {
    this.batchLoaded = true;
    this.sectionLoaded = false;
    this.timeSlotLoaded = false;
    this.courseLoaded = false;
    this.roomLoaded = false;
    this.secondStepLoaded = false;
    this.Section = null;
    this.sections = [];
    this.offeredCourses = [];
    this.sectionApi.getSectionsByBatch(batchId).subscribe((data) => {
      console.log("sections..", data);
      this.sections = data;
      this.Section = null;
    });
    this.Section = null;
  };

  sectionSelected = async () => {
    this.sectionLoaded = true;
    this.timeSlotLoaded = false;
    this.courseLoaded = false;
    this.roomLoaded = false;
    this.secondStepLoaded = false;
    this.Course = null;
    this.courses = [];
    this.offeredCourses = [];
    this.availableCourse = [];
    this.batchAndSectionId = {
      batch: this.Batch,
      section: this.Section,
    };
    this.batchAndSection = "";
    this.batches.filter((batch) => {
      if (batch.id == this.Batch) {
        this.batchAndSection = batch.batchName + " ";
      }
    });
    this.sections.filter((section) => {
      if (section.id == this.Section) {
        return (this.batchAndSection += section.sectionName);
      }
    });
    console.log("batch and section..", this.batchAndSection);
    this.courseOfferedApi
      .getAllCourseOfferedToBatchAndSection(this.batchAndSectionId)
      .subscribe((data) => {
        this.offeredCourses = data;
        this.Course = null;
        this.offeredCourses.forEach(async (offer) => {
          let tempCourse = {
            faculty: offer.facultyID,
            courseId: offer.courseID,
            course: "",
          };
          this.courseApi.getOneCourse(offer.courseID).subscribe((data) => {
            tempCourse.course = data[0].crs_title;
            this.availableCourse.push(tempCourse);
          });
        });
        this.Course = null;
        this.Time = "";
        console.log("offered courses..", this.offeredCourses);
      });
    //assuming time slot selected ..
    this.timeSlotLoaded = true;
    this.courseLoaded = false;
    this.roomLoaded = false;
    this.secondStepLoaded = false;
    this.Course = null;
    this.Room = null;
    this.rooms = [];
    let asignFaculty = [];
    this.batchAndSectionId = {
      batch: this.Batch,
      section: this.Section,
    };
    console.log(
      "offered courses with crs title and facultyid..",
      this.availableCourse
    );
    this.availableCourses = this.courses.filter((course) => {});
  };

  courseSelected = async (courseOffered) => {
    this.courseLoaded = true;
    this.roomLoaded = false;
    this.secondStepLoaded = false;
    this.Room = null;
    this.rooms = [];
    let cfids = [];
    this.availableCourse.filter((ofcr) => {
      if (courseOffered == ofcr.courseId) {
        return (this.Course = ofcr.courseId);
      }
    });
    this.availableCourse.filter((ofcr) => {
      if (courseOffered == ofcr.courseId) {
        return (this.Faculty = ofcr.faculty);
      }
    });
    cfids.push(this.Course);
    cfids.push(this.Faculty);
    let i = 0;
    let promises = cfids.map((id) => {
      if (i == 0) {
        i++;
        return this.courseApi.getOneCourse(id).toPromise();
      }
      if (i == 1) {
        i++;
        return this.facultyApi.getOneFaculty(id).toPromise();
      }
    });
    this.roomApi.getAllRooms().subscribe((data) => {
      this.rooms = data;
    });
    let results = await Promise.all(promises);
    let courseAndFacultyShortName =
      results[0][0].crs_shortName + ", " + results[1][0].fac_shortName;
    this.courseShortName = results[0][0].crs_shortName;
    this.facultyShortName = results[1][0].fac_shortName;
    console.log("course and fac shortname..", courseAndFacultyShortName);
  };

  facultySelected = () => {};

  roomSelected = () => {
    this.secondStepLoaded = true;
    this.roomLoaded = true;
    if (
      this.batchLoaded == true &&
      this.sectionLoaded == true &&
      this.timeSlotLoaded == true &&
      this.courseLoaded == true &&
      this.roomLoaded == true
    ) {
      this.secondStepLoaded = true;
    }
    console.log("loded fields..", this.secondStepLoaded);
  };

  getCoursesOffered = () => {
    // this.courseOfferedApi.getAllCoursesOffered().subscribe(
    //   (data) => {
    //     this.coursesOffered = data;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  };

  getRooms = () => {
    // this.roomService.getAllRooms().subscribe(
    //   (data) => {
    //     this.rooms = data;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  };

  addClass = () => {
    // alert("Allready added!");
    this.routineRow = {
      title: this.Title,
      batchAndSection: this.batchAndSection,
      timeSlot: this.Time,
      course: this.courseShortName,
      faculty: this.facultyShortName,
      room: this.Room,
    };
    this.tempRoutine = `${this.batchAndSection}, ${this.courseShortName}, ${this.facultyShortName}, ${this.Room}`;
    alert(this.tempRoutine);
  };

  ngOnInit(): void {}
}
