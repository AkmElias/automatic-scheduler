import { Component, OnInit } from '@angular/core';
import { CourseOffered } from '../course-offered';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseOfferedapiService } from '../course-offeredapi.service';
import { CourseapiService } from '../courseapi.service';
import { BatchapiService } from '../batchapi.service';
import { FacultyapiService } from '../facultyapi.service';

@Component({
  selector: 'app-update-course-offered',
  templateUrl: './update-course-offered.component.html',
  styleUrls: ['./update-course-offered.component.css'],
  providers: [CourseOfferedapiService]
})
export class UpdateCourseOfferedComponent implements OnInit {

id: number;
courseOffered: CourseOffered;
courses: any = [];
batches: any = [];
faculties: any = [];

  constructor(
    private courseOfferedService: CourseOfferedapiService,  private api: CourseapiService,
    private batchService: BatchapiService, private facultyService: FacultyapiService,
    private router: Router, private route: ActivatedRoute)

    {
      this.getCourses();
      this.getBatches();
      this.getFaculties();
    }

    getCourses = () => {
      this.api.getAllCourses().subscribe(
        data => {
          this.courses = data;
        },
        error => {
          console.log(error);
        }
      );
    }

    getBatches = () => {
      this.batchService.getAllBatches().subscribe(
        data => {
          this.batches = data;
        },
        error => {
          console.log(error);
        }
      );
    }

    getFaculties = () => {
      this.facultyService.getAllFaculties().subscribe(
        data => {
          this.faculties = data;
        },
        error => {
          console.log(error);
        }
      );
    }

  ngOnInit() {
    this.courseOffered = new CourseOffered();

    this.id = this.route.snapshot.params['id'];

    this.courseOfferedService.getOneCourseOffered(this.id)
      .subscribe(data => {
        console.log(data)
        this.courseOffered = data;
      }, error => console.log(error));
  }

  updateCourseOffered() {
    this.courseOfferedService.updateCourseOffered(this.courseOffered)
      .subscribe(data => console.log(data), error => console.log(error));
    this.courseOffered = new CourseOffered();
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(['/courseOffered']);
  }

}
