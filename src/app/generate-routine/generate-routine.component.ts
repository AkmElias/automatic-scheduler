import { RoutineapiService } from "./../routineapi.service";
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
  backButton = false;
  Days = [];
  Day = "";
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

  //arrays for individual columns...
  saturday = "SATURDAY";
  sunday = "SUNDAY";
  monday = "MONDAY";
  tuesday = "TUESDAY";
  wednesday = "WEDNESDAY";
  thursday = "THURSDAY";
  friday = "FRIDAY";

  eight = "8.00am to 9.20am";
  nineThirty = "9.30am to 10.50am";
  eleven = "11.00am to 12.20pm";
  twelveThirty = "12.30pm to 1.50pm";
  two = "2.00pm to 3.20pm";
  threeThirty = "3.30pm to 4.50pm";

  saturdayEight = [];
  saturdayNineThirty = [];
  saturdayEleven = [];
  saturdayTwelveThirty = [];
  saturdayTwo = [];
  saturdayThreeThirty = [];
  sundayEight = [];
  sundayNineThirty = [];
  sundayEleven = [];
  sundayTwelveThirty = [];
  sundayTwo = [];
  sundayThreeThirty = [];
  mondayEight = [];
  mondayNineThirty = [];
  mondayEleven = [];
  mondayTwelveThirty = [];
  mondayTwo = [];
  mondayThreeThirty = [];
  tuesdayEight = [];
  tuesdayNineThirty = [];
  tuesdayEleven = [];
  tuesdayTwelveThirty = [];
  tuesdayTwo = [];
  tuesdayThreeThirty = [];
  wednesdayEight = [];
  wednesdayNineThirty = [];
  wednesdayEleven = [];
  wednesdayTwelveThirty = [];
  wednesdayTwo = [];
  wednesdayThreeThirty = [];
  thursdayEight = [];
  thursdayNineThirty = [];
  thursdayEleven = [];
  thursdayTwelveThirty = [];
  thursdayTwo = [];
  thursdayThreeThirty = [];
  fridayEight = [];
  fridayNineThirty = [];
  fridayEleven = [];
  fridayTwelveThirty = [];
  fridayTwo = [];
  fridayThreeThirty = [];

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
    private routineApi: RoutineapiService,
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
    this.backButton = true;
    this.getRoutines();
  };

  getRoutines = async () => {
    this.routines = await this.routineApi
      .getRoutinesByTermYearProgram(this.Title)
      .toPromise();
    this.populateColumnsArrayWithAppropriateroutine();
    console.log("routines by title..", this.routines);
  };

  populateColumnsArrayWithAppropriateroutine = () => {
    this.routines.forEach((routine) => {
      if (routine.day === this.saturday && routine.timeSlot === this.eight) {
        this.saturdayEight.push(routine);
      } else if (
        routine.day === this.saturday &&
        routine.timeSlot === this.nineThirty
      ) {
        this.saturdayNineThirty.push(routine);
      } else if (
        routine.day === this.saturday &&
        routine.timeSlot === this.eleven
      ) {
        this.saturdayEleven.push(routine);
      } else if (
        routine.day === this.saturday &&
        routine.timeSlot === this.twelveThirty
      ) {
        this.saturdayTwelveThirty.push(routine);
      } else if (
        routine.day === this.saturday &&
        routine.timeSlot === this.two
      ) {
        this.saturdayTwo.push(routine);
      } else if (
        routine.day === this.saturday &&
        routine.timeSlot === this.threeThirty
      ) {
        this.saturdayThreeThirty.push(routine);
      } else if (
        routine.day === this.sunday &&
        routine.timeSlot === this.eight
      ) {
        this.sundayEight.push(routine);
      } else if (
        routine.day === this.sunday &&
        routine.timeSlot === this.nineThirty
      ) {
        this.sundayNineThirty.push(routine);
      } else if (
        routine.day === this.sunday &&
        routine.timeSlot === this.eleven
      ) {
        this.sundayEleven.push(routine);
      } else if (
        routine.day === this.sunday &&
        routine.timeSlot === this.twelveThirty
      ) {
        this.sundayTwelveThirty.push(routine);
      } else if (routine.day === this.sunday && routine.timeSlot === this.two) {
        this.sundayTwo.push(routine);
      } else if (
        routine.day === this.sunday &&
        routine.timeSlot === this.threeThirty
      ) {
        this.sundayThreeThirty.push(routine);
      } else if (
        routine.day === this.monday &&
        routine.timeSlot === this.eight
      ) {
        this.mondayEight.push(routine);
      } else if (
        routine.day === this.monday &&
        routine.timeSlot === this.nineThirty
      ) {
        this.mondayNineThirty.push(routine);
      } else if (
        routine.day === this.monday &&
        routine.timeSlot === this.eleven
      ) {
        this.mondayEleven.push(routine);
      } else if (
        routine.day === this.monday &&
        routine.timeSlot === this.twelveThirty
      ) {
        this.mondayTwelveThirty.push(routine);
        console.log("monday t 30..", this.mondayTwelveThirty);
      } else if (routine.day === this.monday && routine.timeSlot === this.two) {
        this.mondayTwo.push(routine);
      } else if (
        routine.day === this.monday &&
        routine.timeSlot === this.threeThirty
      ) {
        this.mondayThreeThirty.push(routine);
      } else if (
        routine.day === this.tuesday &&
        routine.timeSlot === this.eight
      ) {
        this.tuesdayEight.push(routine);
      } else if (
        routine.day === this.tuesday &&
        routine.timeSlot === this.nineThirty
      ) {
        this.tuesdayNineThirty.push(routine);
      } else if (
        routine.day === this.tuesday &&
        routine.timeSlot === this.eleven
      ) {
        this.tuesdayEleven.push(routine);
      } else if (
        routine.day === this.tuesday &&
        routine.timeSlot === this.twelveThirty
      ) {
        this.tuesdayTwelveThirty.push(routine);
      } else if (
        routine.day === this.tuesday &&
        routine.timeSlot === this.two
      ) {
        this.tuesdayTwo.push(routine);
      } else if (
        routine.day === this.tuesday &&
        routine.timeSlot === this.threeThirty
      ) {
        this.tuesdayThreeThirty.push(routine);
      } else if (
        routine.day === this.wednesday &&
        routine.timeSlot === this.eight
      ) {
        this.wednesdayEight.push(routine);
      } else if (
        routine.day === this.wednesday &&
        routine.timeSlot === this.nineThirty
      ) {
        this.wednesdayNineThirty.push(routine);
      } else if (
        routine.day === this.wednesday &&
        routine.timeSlot === this.eleven
      ) {
        this.wednesdayEleven.push(routine);
      } else if (
        routine.day === this.wednesday &&
        routine.timeSlot === this.twelveThirty
      ) {
        this.wednesdayTwelveThirty.push(routine);
      } else if (
        routine.day === this.wednesday &&
        routine.timeSlot === this.two
      ) {
        this.wednesdayTwo.push(routine);
      } else if (
        routine.day === this.wednesday &&
        routine.timeSlot === this.threeThirty
      ) {
        this.wednesdayThreeThirty.push(routine);
      } else if (
        routine.day === this.thursday &&
        routine.timeSlot === this.eight
      ) {
        this.thursdayEight.push(routine);
      } else if (
        routine.day === this.thursday &&
        routine.timeSlot === this.nineThirty
      ) {
        this.thursdayNineThirty.push(routine);
      } else if (
        routine.day === this.thursday &&
        routine.timeSlot === this.eleven
      ) {
        this.thursdayEleven.push(routine);
      } else if (
        routine.day === this.thursday &&
        routine.timeSlot === this.twelveThirty
      ) {
        this.thursdayTwelveThirty.push(routine);
      } else if (
        routine.day === this.thursday &&
        routine.timeSlot === this.two
      ) {
        this.thursdayTwo.push(routine);
      } else if (
        routine.day === this.thursday &&
        routine.timeSlot === this.threeThirty
      ) {
        this.thursdayThreeThirty.push(routine);
      } else if (
        routine.day === this.friday &&
        routine.timeSlot === this.eight
      ) {
        this.fridayEight.push(routine);
      } else if (
        routine.day === this.friday &&
        routine.timeSlot === this.nineThirty
      ) {
        this.fridayNineThirty.push(routine);
      } else if (
        routine.day === this.friday &&
        routine.timeSlot === this.eleven
      ) {
        this.fridayEleven.push(routine);
      } else if (
        routine.day === this.friday &&
        routine.timeSlot === this.twelveThirty
      ) {
        this.fridayTwelveThirty.push(routine);
      } else if (routine.day === this.friday && routine.timeSlot === this.two) {
        this.fridayTwo.push(routine);
      } else if (
        routine.day === this.friday &&
        routine.timeSlot === this.threeThirty
      ) {
        this.fridayThreeThirty.push(routine);
      }
    });
  };

  setDayAndTimeSlot = (day, time) => {
    this.Day = day;
    this.TimeSlot = time;
    console.log(
      `day: ${this.Day} timeSlot: ${this.TimeSlot} Program: ${this.Program}`
    );
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
      day: this.Day,
      batchAndSection: this.batchAndSection,
      timeSlot: this.TimeSlot,
      course: this.courseShortName,
      faculty: this.facultyShortName,
      room: this.Room,
    };
    // this.tempRoutine = `${this.batchAndSection}, ${this.courseShortName}, ${this.facultyShortName}, ${this.Room}`;
    console.log("temp routine..", this.routineRow);
    this.routineApi.createRoutine(this.routineRow).subscribe((data) => {
      console.log("added class..", data);
      this.emptyColumnsArray();
      this.getRoutines();
      this.clearForm();
    });
    //alert(this.tempRoutine);
  };

  clearForm = () => {
    this.batchLoaded = false;
    this.sectionLoaded = false;
    this.timeSlotLoaded = false;
    this.courseLoaded = false;
    this.roomLoaded = false;
    this.secondStepLoaded = false;
    this.Section = null;
    this.sections = [];
    this.offeredCourses = [];
    this.Batch = 0;
    this.Section = 0;
    this.batchAndSectionId = {};
    this.Faculty = null;
    this.Course = null;
  };

  backToFirstStep = () => {
    this.firstStepSubmitted = false;
    this.Term = "Spring";
    this.Year = 2021;
    this.Program = "";
    this.Title = "";
    this.Batch = 0;
    this.Section = 0;
    this.batchAndSectionId = {};
    this.Faculty = null;
    this.Course = null;
    this.backButton = false;
    this.routines = [];
    this.emptyColumnsArray();
    this.clearForm();
  };

  emptyColumnsArray = () => {
    this.saturdayEight = [];
    this.saturdayNineThirty = [];
    this.saturdayEleven = [];
    this.saturdayTwelveThirty = [];
    this.saturdayTwo = [];
    this.saturdayThreeThirty = [];
    this.sundayEight = [];
    this.sundayNineThirty = [];
    this.sundayEleven = [];
    this.sundayTwelveThirty = [];
    this.sundayTwo = [];
    this.sundayThreeThirty = [];
    this.mondayEight = [];
    this.mondayNineThirty = [];
    this.mondayEleven = [];
    this.mondayTwelveThirty = [];
    this.mondayTwo = [];
    this.mondayThreeThirty = [];
    this.tuesdayEight = [];
    this.tuesdayNineThirty = [];
    this.tuesdayEleven = [];
    this.tuesdayTwelveThirty = [];
    this.tuesdayTwo = [];
    this.tuesdayThreeThirty = [];
    this.wednesdayEight = [];
    this.wednesdayNineThirty = [];
    this.wednesdayEleven = [];
    this.wednesdayTwelveThirty = [];
    this.wednesdayTwo = [];
    this.wednesdayThreeThirty = [];
    this.thursdayEight = [];
    this.thursdayNineThirty = [];
    this.thursdayEleven = [];
    this.thursdayTwelveThirty = [];
    this.thursdayTwo = [];
    this.thursdayThreeThirty = [];
    this.fridayEight = [];
    this.fridayNineThirty = [];
    this.fridayEleven = [];
    this.fridayTwelveThirty = [];
    this.fridayTwo = [];
    this.fridayThreeThirty = [];
  };

  ngOnInit(): void {}
}
