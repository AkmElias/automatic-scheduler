import { Faculty } from "./../faculty";
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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

@Component({
  selector: "app-generate-routine",
  templateUrl: "./generate-routine.component.html",
  styleUrls: ["./generate-routine.component.css"],
})
export class GenerateRoutineComponent implements OnInit {
  id: number;
  backButton = false;
  neverTrue = true;
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
  courseCredit = 0;
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

  courseTitle = ""
  facultyFullName = "";

  dayTime = "";
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
  courseTobeOmmites = [];
  loggedIn = false;
  batchAndSections;
  batchAndSectionsArray;
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
    if (this.authService.isLoggedIn()) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
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
      "8am to 9.20am",
      "9.30am to 10.50am",
      "11am to 12.20pm",
      "12.30pm to 1.50pm",
      "2pm to 3.20pm",
      "3.30pm to 4.50pm",
    ];
    this.Years = [2020, 2021, 2022, 2023, 2024, 2025];
    this.getRooms();
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

  exportAsPDF(data, id) {
    let doc = document.getElementById(id);
    console.log("doc data: ", doc);
    html2canvas(data, { allowTaint: true }).then((canvas) => {
      let HTML_Width = canvas.width;
      let HTML_Height = canvas.height;
      let top_left_margin = 15;
      let PDF_Width = HTML_Width + top_left_margin * 2;
      let PDF_Height = PDF_Width * 1 + top_left_margin * 2;
      let canvas_image_width = HTML_Width;
      let canvas_image_height = HTML_Height;
      let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
      canvas.getContext("2d");
      let imgData = canvas.toDataURL("image/jpeg", 1.0);
      let pdf = new jsPDF("p", "px", [PDF_Width, PDF_Height]);
      pdf.addImage(
        imgData,
        "JPG",
        top_left_margin,
        top_left_margin,
        canvas_image_width,
        canvas_image_height
      );
      for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage([PDF_Width, PDF_Height], "p");
        pdf.addImage(
          imgData,
          "JPG",
          top_left_margin,
          -(PDF_Height * i) + top_left_margin * 4,
          canvas_image_width,
          canvas_image_height
        );
      }
      pdf.save(`${this.Title}.pdf`);
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
    this.getBatchesAndSections();
    this.populateColumnsArrayWithAppropriateroutine();
    console.log("routines by title..", this.routines);
    // console.log("monday twelve thirty..", this.mondayTwelveThirty);
    // console.log("tuesday twelve thirty..", this.tuesdayTwelveThirty);
  };

  getBatchesAndSections = () => {
    this.batchAndSectionsArray = [];
    this.batchAndSections = new Set();
    this.routines.forEach((routine) => {
      this.batchAndSections.add(routine.batchAndSection);
    });
    this.batchAndSections.forEach((bas) => {
      this.batchAndSectionsArray.push(bas);
    });
    this.batchAndSectionsArray.sort();

    console.log("batches and sections..", this.batchAndSectionsArray);
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
    this.clearForm();
    this.Day = day;
    this.TimeSlot = time;
    this.dayTime = `${this.Day},${this.TimeSlot}`;
    console.log(
      `day: ${this.Day} timeSlot: ${this.TimeSlot} Program: ${this.Program}`
    );
    this.timeSlotLoaded = true;
    this.getRooms();
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

    let sectionInThisTimeSlot = this.filterSections();

    if (sectionInThisTimeSlot == true) {
      alert(`${this.batchAndSection} has class in this time slot.`);
    } else {
      this.sectionLoaded = true;
      this.timeSlotLoaded = false;
      this.courseLoaded = false;
      this.roomLoaded = false;
      this.secondStepLoaded = false;
      this.Course = null;
      this.courses = [];
      this.offeredCourses = [];
      this.availableCourse = [];
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
              courseCredit: 0,
            };
            this.courseApi.getOneCourse(offer.courseID).subscribe((data) => {
              tempCourse.course = data[0].crs_title;
              tempCourse.courseCredit = data[0].crs_credit;
              if(!this.filterCourses(tempCourse))
                  this.availableCourse.push(tempCourse);
            });
          });
          this.Course = null;
          this.Time = "";
        });

      //assuming time slot selected ..
      this.timeSlotLoaded = true;
      this.courseLoaded = false;
      this.roomLoaded = false;
      this.secondStepLoaded = false;
      this.Course = null;
      this.Room = null;
      let asignFaculty = [];
      this.batchAndSectionId = {
        batch: this.Batch,
        section: this.Section,
      };
      this.getRooms();

      console.log(
        "offered courses with crs title and facultyid..",
        this.availableCourse
      );


      // this.availableCourses = this.courses.filter((course) => {});
    }
  };

  filterSections = () => {
    let sectionInThisTimeSlot = false;
    if (this.Day == this.saturday) {
      if (this.TimeSlot == this.eight) {
        this.saturdayEight.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.nineThirty) {
        this.saturdayNineThirty.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.eleven) {
        this.saturdayEleven.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.twelveThirty) {
        this.saturdayTwelveThirty.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.two) {
        this.saturdayTwo.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.threeThirty) {
        this.saturdayThreeThirty.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
    }

    if (this.Day == this.sunday) {
      if (this.TimeSlot == this.eight) {
        this.sundayEight.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.nineThirty) {
        this.sundayNineThirty.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.eleven) {
        this.sundayEleven.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.twelveThirty) {
        this.sundayTwelveThirty.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.two) {
        this.sundayTwo.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.threeThirty) {
        this.sundayThreeThirty.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
    }

    if (this.Day == this.monday) {
      if (this.TimeSlot == this.eight) {
        this.mondayEight.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.nineThirty) {
        this.mondayNineThirty.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.eleven) {
        this.mondayEleven.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.twelveThirty) {
        this.mondayTwelveThirty.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.two) {
        this.mondayTwo.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.threeThirty) {
        this.mondayThreeThirty.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
    }

    if (this.Day == this.tuesday) {
      if (this.TimeSlot == this.eight) {
        this.tuesdayEight.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.nineThirty) {
        this.tuesdayNineThirty.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.eleven) {
        this.tuesdayEleven.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.twelveThirty) {
        this.tuesdayTwelveThirty.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.two) {
        this.tuesdayTwo.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.threeThirty) {
        this.tuesdayThreeThirty.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
    }

    if (this.Day == this.wednesday) {
      if (this.TimeSlot == this.eight) {
        this.wednesdayEight.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.nineThirty) {
        this.wednesdayNineThirty.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.eleven) {
        this.wednesdayEleven.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.twelveThirty) {
        this.wednesdayTwelveThirty.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.two) {
        this.wednesdayTwo.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.threeThirty) {
        this.wednesdayThreeThirty.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
    }

    if (this.Day == this.thursday) {
      if (this.TimeSlot == this.eight) {
        this.thursdayEight.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.nineThirty) {
        this.thursdayNineThirty.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.eleven) {
        this.thursdayEleven.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.twelveThirty) {
        this.thursdayTwelveThirty.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.two) {
        this.thursdayTwo.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.threeThirty) {
        this.thursdayThreeThirty.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
    }

    if (this.Day == this.friday) {
      if (this.TimeSlot == this.eight) {
        this.fridayEight.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.nineThirty) {
        this.fridayNineThirty.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.eleven) {
        this.fridayEleven.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.twelveThirty) {
        this.fridayTwelveThirty.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.two) {
        this.fridayTwo.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
      if (this.TimeSlot == this.threeThirty) {
        this.fridayThreeThirty.forEach((routine) => {
          if (routine.batchAndSection === this.batchAndSection) {
            sectionInThisTimeSlot = true;
          }
        });
      }
    }
    return sectionInThisTimeSlot;
  };

  filterCourses = (tempCourse) => {
    let classNo = 0;
    this.courseCredit = tempCourse.courseCredit;
    let title = tempCourse.course;

    if (this.courseCredit == 1.5) {
      classNo = 2;
    } else if (this.courseCredit == 3) {
      classNo = 2;
    } else if (this.courseCredit == 4.5) {
      classNo = 3;
    }

    let creditWiseClass = false;
    let creditClass = 0;

    this.routines.forEach(routine => {
      if(title == routine.courseTitle && this.batchAndSection == routine.batchAndSection) {
           creditClass++;
      }
    })

    if(creditClass >= classNo ){
      return true;
    } else return false;
  }

  courseSelected = async (courseOffered) => {
    console.log(
      "offered courses with crs title and facultyid..",
      this.availableCourse
    );
    this.courseLoaded = true;
    this.roomLoaded = false;
    this.secondStepLoaded = false;
    this.Room = null;
    let cfids = [];
    this.availableCourse.filter((ofcr) => {
      if (courseOffered == ofcr.courseId) {
        this.Course = ofcr.courseId;
        this.Faculty = ofcr.faculty;
        this.courseCredit = ofcr.courseCredit;
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

    let results = await Promise.all(promises);
    let courseAndFacultyShortName =
      results[0][0].crs_shortName + ", " + results[1][0].fac_shortName;
    this.courseShortName = results[0][0].crs_shortName;
    this.courseTitle = results[0][0].crs_title;
    this.facultyShortName = results[1][0].fac_shortName;
    this.facultyFullName = results[1][0].fac_firstName + " " + results[1][0].fac_lastName

    console.log("course and fac shortname..", this.facultyFullName);
  };

  roomFilter = () => {
    if (this.Day == this.saturday) {
      if (this.TimeSlot == this.eight) {
        this.saturdayEight.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.nineThirty) {
        this.saturdayNineThirty.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.eleven) {
        this.saturdayEleven.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.twelveThirty) {
        this.saturdayTwelveThirty.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.two) {
        this.saturdayTwo.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.threeThirty) {
        this.saturdayThreeThirty.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
    }

    if (this.Day == this.sunday) {
      if (this.TimeSlot == this.eight) {
        this.sundayEight.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.nineThirty) {
        this.sundayNineThirty.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.eleven) {
        this.sundayEleven.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.twelveThirty) {
        this.sundayTwelveThirty.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.two) {
        this.sundayTwo.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.threeThirty) {
        this.sundayThreeThirty.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
    }

    if (this.Day == this.monday) {
      if (this.TimeSlot == this.eight) {
        this.mondayEight.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.nineThirty) {
        this.mondayNineThirty.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.eleven) {
        this.mondayEleven.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.twelveThirty) {
        this.mondayTwelveThirty.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.two) {
        this.mondayTwo.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.threeThirty) {
        this.mondayThreeThirty.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
    }

    if (this.Day == this.tuesday) {
      if (this.TimeSlot == this.eight) {
        this.tuesdayEight.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.nineThirty) {
        this.tuesdayNineThirty.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.eleven) {
        this.tuesdayEleven.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.twelveThirty) {
        this.tuesdayTwelveThirty.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.two) {
        this.tuesdayTwo.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.threeThirty) {
        this.tuesdayThreeThirty.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
    }

    if (this.Day == this.wednesday) {
      if (this.TimeSlot == this.eight) {
        this.wednesdayEight.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.nineThirty) {
        this.wednesdayNineThirty.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.eleven) {
        this.wednesdayEleven.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.twelveThirty) {
        this.wednesdayTwelveThirty.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.two) {
        this.wednesdayTwo.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.threeThirty) {
        this.wednesdayThreeThirty.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
    }

    if (this.Day == this.thursday) {
      if (this.TimeSlot == this.eight) {
        this.thursdayEight.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.nineThirty) {
        this.thursdayNineThirty.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.eleven) {
        this.thursdayEleven.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.twelveThirty) {
        this.thursdayTwelveThirty.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.two) {
        this.thursdayTwo.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.threeThirty) {
        this.thursdayThreeThirty.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
    }

    if (this.Day == this.friday) {
      if (this.TimeSlot == this.eight) {
        this.fridayEight.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.nineThirty) {
        this.fridayNineThirty.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.eleven) {
        this.fridayEleven.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.twelveThirty) {
        this.fridayTwelveThirty.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.two) {
        this.fridayTwo.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
      if (this.TimeSlot == this.threeThirty) {
        this.fridayThreeThirty.forEach((routine) => {
          let rm = routine.room;
          this.rooms = this.rooms.filter((room) => room.roomCode != rm);
        });
      }
    }
  };

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
    this.roomApi.getAllRooms().subscribe((data) => {
      this.rooms = data;
      this.roomFilter();
    });
  };

  addClass = () => {
    // alert("Allready added!");
    this.routineRow = {
      title: this.Title,
      day: this.Day,
      batchAndSection: this.batchAndSection,
      timeSlot: this.TimeSlot,
      course: this.courseShortName,
      courseTitle: this.courseTitle,
      faculty: this.facultyShortName,
      facultyFullName: this.facultyFullName,
      room: this.Room,
    };
    // this.tempRoutine = `${this.batchAndSection}, ${this.courseShortName}, ${this.facultyShortName}, ${this.Room}`;
    //check conditions....
    let check = this.checkConditions(this.routineRow);
    console.log("temp routine..", this.routineRow);
    if (check == true) {
      alert("Class added!");
      this.routineApi.createRoutine(this.routineRow).subscribe((data) => {
        console.log("added class..", data);
        this.clearForm();
        this.getBatchesAndSections();
        this.emptyColumnsArray();
        this.getRoutines();
        this.roomFilter();
      });
    } else {
      return;
    }
    //alert(this.tempRoutine);
  };

  checkConditions = (tempRoutine) => {
    if (
      !tempRoutine.batchAndSection ||
      !tempRoutine.course ||
      !tempRoutine.faculty ||
      !tempRoutine.room
    ) {
      alert("One or more required field missing");
      return false;
    }

    let classNo = 0;

    if (this.courseCredit == 1.5) {
      classNo = 2;
    } else if (this.courseCredit == 3) {
      classNo = 2;
    } else if (this.courseCredit == 4.5) {
      classNo = 3;
    }
    console.log("class No: ", classNo);
    let creditWiseClass = false;
    let moreThanTwoClass = false;
    let sectionHasClassInTimeSlot = false;
    let facultyHasClassInTimeSlot = false;
    let courseHasAlreadyInThisDay = false;
    let roomiSBooked = false;
    let two = 0;
    let creditClass = 0;

    this.routines.forEach((routine) => {
      if (
        this.Day === routine.day &&
        this.batchAndSection === routine.batchAndSection
      ) {
        two++;
      }
      if (
        this.courseShortName == routine.courseName &&
        this.batchAndSection == routine.batchAndSection
      ) {
        creditClass++;
      }
      if (
        this.batchAndSection == routine.batchAndSection &&
        this.Day == routine.day &&
        this.TimeSlot == routine.timeSlot
      ) {
        sectionHasClassInTimeSlot = true;
      } else if (
        this.facultyShortName == routine.faculty &&
        this.Day == routine.day &&
        this.TimeSlot == routine.timeSlot
      ) {
        facultyHasClassInTimeSlot = true;
      } else if (
        this.courseShortName == routine.courseName &&
        this.batchAndSection == routine.batchAndSection &&
        this.Day == routine.day
      ) {
        courseHasAlreadyInThisDay = true;
      } else if (
        this.Room == routine.room &&
        this.Day == routine.day &&
        this.TimeSlot == routine.timeSlot
      ) {
        roomiSBooked = true;
      }
      if (creditClass >= classNo) {
        creditWiseClass = true;
      }
    });
    console.log(`moreThanTwoClass: ${moreThanTwoClass}, creditWiseClass: ${creditWiseClass}, sectionHasClassInTimeSLot: ${sectionHasClassInTimeSlot},
    facultyHasClass: ${facultyHasClassInTimeSlot}, courseHasAlrerady: ${courseHasAlreadyInThisDay}, roomIsBooked: ${roomiSBooked} `);
    if (moreThanTwoClass) {
      alert("This section has already two classes this day.");
      return false;
    } else if (creditWiseClass) {
      alert(`This course can't be offered more than ${classNo} in a week.`);
      return false;
    } else if (sectionHasClassInTimeSlot) {
      alert("This section has already class in this timeSlot.");
      return false;
    } else if (facultyHasClassInTimeSlot) {
      alert("This faculty has already class this timeSlot.");
      return false;
    } else if (courseHasAlreadyInThisDay) {
      alert("This sectiion has already this course for the day.");
      return false;
    } else if (roomiSBooked) {
      alert("This room is booked for this timeSlot.");
      return false;
    } else return true;
  };

  clearForm = () => {
    this.batchLoaded = false;
    this.sectionLoaded = false;
    this.timeSlotLoaded = false;
    this.courseLoaded = false;
    this.roomLoaded = false;
    this.secondStepLoaded = false;
    this.Section = 0;
    this.sections = [];
    this.offeredCourses = [];
    this.Batch = 0;
    this.Section = 0;
    this.Course = 0;
    this.batchAndSectionId = {};
    this.Faculty = 0;
    this.Course = 0;
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

  deleteClass = (id) => {
    if (confirm("Are you sure to delete!")) {
      this.routines = this.routines.filter((routine) => routine.id != id);
      this.emptyColumnsArray();
      this.populateColumnsArrayWithAppropriateroutine();
      this.routineApi.deleteRoutine(id).subscribe((data) => {});
    } else {
      return;
    }
  };

  ngOnInit(): void {}
}
