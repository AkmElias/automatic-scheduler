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
    this.Term = "Spring";
    this.Year = 2020;
    this.Years = [2020, 2021, 2022, 2023, 2024, 2025];
    this.Day = "SATURDAY";
    this.Program = "CSE";
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
    this.batchAndSectionId = {};
    this.Time = "";
    this.timeSlots = [
      "8:00am to 9:20am",
      "9:30am to 10:50am",
      "11:00am to 12:30pm",
      "12:30am to 1:50pm",
      "2:00pm to 3:20pm",
      "3:30pm to 4:50pm",
    ];
    this.Faculty = null;
    this.Course = null;
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
    this.courseShortName = "";
    this.facultyShortName = "";
    this.routineRow = {
      title: "",
      batchAndSection: "",
      timeSlot: "",
      course: "",
      faculty: "",
      room: "",
    };
    this.idRoutineRow = {
      batch: "",
      section: "",
      timeSlot: "",
      course: "",
      faculty: "",
      room: "",
    };
    this.getCoursesOffered();
    this.getRooms();
    this.getTimeSlots();
  }

  getPrograms = () => {
    this.programApi.getAllPrograms().subscribe((data) => {
      this.programs = data;
      // console.log("programs: ", data);
    });
  };

  programSelected = () => {
    if (this.Program && this.Term && this.Year && this.Program) {
      this.firstStep = true;
      // console.log("Program Code..", this.Program);
    }
  };

  addTermYearDayProgram = () => {
    this.firstStepSubmitted = true;
    this.batchApi.getBatchesByProgram(this.Program).subscribe((data) => {
      this.batches = data;
      // console.log("batches..", data);
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
    this.sectionLoaded = false;
    this.timeSlotLoaded = false;
    this.courseLoaded = false;
    this.roomLoaded = false;
    this.secondStepLoaded = false;
    this.Section = null;
    this.sections = [];
    this.offeredCourses = [];
    this.batches.filter((batch) => {
      if (batch.id == this.Batch) {
        this.batchAndSection = batch.batchName + " ";
      }
    });
    this.sectionApi.getSectionsByBatch(batchId).subscribe((data) => {
      console.log("sections..", data);
      this.sections = data;
      this.Section = null;
    });
    // this.Section = null;
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
    this.batchAndSectionId = {
      batch: this.Batch,
      section: this.Section,
    };
    this.sections.filter((section) => {
      if (section.id == this.Section) {
        this.batchAndSection += section.sectionName;
      }
    });
    console.log("batch and section..", this.batchAndSection);
    await this.courseOfferedApi
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
          await this.courseApi
            .getOneCourse(offer.courseID)
            .subscribe((data) => {
              tempCourse.course = data[0].crs_title;
              this.availableCourse.push(tempCourse);
            });
        });
        this.Course = null;
        this.Time = "";

        console.log("offered courses..", this.offeredCourses);
      });
  };

  timeSlotSelected = () => {
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

    await this.roomApi.getAllRooms().subscribe((data) => {
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
    // console.log("loded fields..", this.secondStepLoaded);
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

  addRoutineRaw = () => {
    this.routineRow = {
      title: this.RoutineTitle,
      batchAndSection: this.batchAndSection,
      timeSlot: this.Time,
      course: this.courseShortName,
      faculty: this.facultyShortName,
      room: this.Room,
    };
    this.idRoutineRow = {
      batch: this.Batch,
      section: this.Section,
      timeSlot: this.Time,
      course: this.Course,
      faculty: this.Faculty,
      room: this.Room,
    };
    console.log("day routine..", this.routineRow);
    console.log("day routine in ids..", this.idRoutineRow);
    this.routines.push(this.routineRow);
    this.idRoutines.push(this.idRoutineRow);
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
