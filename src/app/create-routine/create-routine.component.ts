import { FacultyapiService } from "./../facultyapi.service";
import { CourseapiService } from "./../courseapi.service";
import { TimeSlot } from "./../time-slot";
import { SectionapiService } from "./../sectionapi.service";
import { BatchapiService } from "./../batchapi.service";
import { ProgramapiService } from "./../programapi.service";
import { RoutineapiService } from "../routineapi.service";
import { Routine } from "../routine";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CourseOfferedapiService } from "../course-offeredapi.service";
import { RoomapiService } from "../roomapi.service";
import { TimeSlotapiService } from "../time-slotapi.service";

@Component({
  selector: "app-create-routine",
  templateUrl: "./create-routine.component.html",
  styleUrls: ["./create-routine.component.css"],
})
export class CreateRoutineComponent {
  id: number;
  RoutineTitle: String;
  Term: String;
  Year: Number;
  Years = [];
  Day: String;
  Days = [];
  Program: String;
  programs = [];
  firstStep = false;
  firstStepSubmitted = false;
  Batch: Number;
  batches = [];
  Section: Number;
  sections = [];
  Time: String;
  timeSlots = [];
  Course: Number;
  offeredCourses = [];
  availableCourses = [];
  courses = [];
  Faculty: String;
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

  routines = [{ routineID: "" }];
  Routine;
  coursesOffered: any = [];
  selectedCourseOffered: Number;
  rooms: any = [];
  exams: any = [];
  dayRoutineByProgram = [];
  routineRow = {};
  submitted = false;

  constructor(
    private routineService: RoutineapiService,
    private programApi: ProgramapiService,
    private batchApi: BatchapiService,
    private sectionApi: SectionapiService,
    private courseApi: CourseapiService,
    private facultyApi: FacultyapiService,
    private roomApi: RoomapiService,
    private courseOfferedApi: CourseOfferedapiService,
    private roomService: RoomapiService,
    private timeslotService: TimeSlotapiService,
    private router: Router
  ) {
    this.RoutineTitle = "";
    this.Routine = {
      routineID: "",
      courseOfferedID: "",
      roomCode: "",
      examID: "",
      timeSlotID: "",
    };
    this.getPrograms();
    this.Term = "";
    this.Year = 2020;
    this.Years = [2020, 2021, 2022, 2023, 2024, 2025];
    this.Day = "";
    this.Days = [
      "SATURDAY",
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
    ];
    this.Program = "";
    this.Batch = 0;
    this.Section = 0;
    this.Time = "";
    this.timeSlots = [
      "8:00am to 9:20am",
      "9:30am to 10:50am",
      "11:00am to 12:30pm",
      "12:30am to 1:50pm",
      "2:00pm to 3:20pm",
      "3:30pm to 4:50pm",
    ];
    console.log("time slots...", this.timeSlots);
    this.routineRow = {
      title: "",
      batchAndSection: "",
      timeSlot: "",
      course: "",
      faculty: "",
      room: "",
    };
    this.selectedCourseOffered = 0;
    this.getCoursesOffered();
    this.getRooms();
    this.getTimeSlots();
  }

  getPrograms = () => {
    this.programApi.getAllPrograms().subscribe((data) => {
      this.programs = data;
      console.log("programs: ", data);
    });
  };

  programSelected = () => {
    if (this.Program) {
      this.firstStep = true;
      console.log("Program Code..", this.Program);
    }
  };

  addTermYearDayProgram = () => {
    this.firstStepSubmitted = true;
    this.batchApi.getBatchesByProgram(this.Program).subscribe((data) => {
      this.batches = data;
      console.log("batches..", data);
    });

    this.programs.filter((program) => {
      if (program.programCode === this.Program)
        this.Program = program.pro_shortForm;
    });
    this.RoutineTitle = `${this.Day},\n ${this.Program}, ${this.Term}, ${this.Year} `;
    alert(`${this.Day},\n${this.Program}, ${this.Term}, ${this.Year} `);
  };

  batchSelected = (batchId) => {
    this.batchLoaded = true;
    this.sectionApi.getSectionsByBatch(batchId).subscribe((data) => {
      console.log("sections..", data);
      this.sections = data;
    });
  };

  sectionSelected = () => {
    this.sectionLoaded = true;
    let batchAndSection = {
      batch: this.Batch,
      section: this.Section,
    };
    this.courseOfferedApi
      .getAllCourseOfferedToBatchAndSection(batchAndSection)
      .subscribe((data) => {
        this.offeredCourses = data;
        console.log("offered courses..", this.offeredCourses);
      });
  };

  timeSlotSelected = () => {
    this.timeSlotLoaded = true;
    let asignFaculty = [];

    this.availableCourses = this.courses.filter((course) => {});
  };

  courseSelected = async (courseOffered) => {
    this.courseLoaded = true;
    if (
      this.batchLoaded == true &&
      this.sectionLoaded == true &&
      this.timeSlotLoaded == true &&
      this.courseLoaded == true &&
      this.roomLoaded == true
    ) {
      this.secondStepLoaded = true;
    }
    let cfids = [];
    let courseId;
    this.offeredCourses.filter((ofcr) => {
      if (courseOffered == ofcr.id) {
        return (courseId = ofcr.courseID);
      }
    });
    let facultyId;
    this.offeredCourses.filter((ofcr) => {
      if (courseOffered == ofcr.id) {
        return (facultyId = ofcr.facultyID);
      }
    });
    cfids.push(courseId);
    cfids.push(facultyId);

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

    let results = await Promise.all(promises);
    let courseAndFacultyShortName =
      results[0][0].crs_shortName + ", " + results[1][0].fac_shortName;

    console.log("course and fac shortname..", courseAndFacultyShortName);
  };

  facultySelected = () => {};

  roomSelected = () => {
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
    this.courseOfferedApi.getAllCoursesOffered().subscribe(
      (data) => {
        this.coursesOffered = data;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getRooms = () => {
    this.roomService.getAllRooms().subscribe(
      (data) => {
        this.rooms = data;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getTimeSlots = () => {
    this.timeslotService.getAllTimeSlots().subscribe(
      (data) => {
        //this.timeSlots = data;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  createRoutine = () => {
    this.routineService.createRoutine(this.Routine).subscribe(
      (data) => {
        this.routines.push(data);
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
    this.createRoutine();
  }

  gotoList() {
    this.router.navigate(["/routine"]);
  }
}
