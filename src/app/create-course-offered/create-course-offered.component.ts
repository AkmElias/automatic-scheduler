import { CourseOfferedapiService } from '../course-offeredapi.service';
import { CourseOffered } from '../course-offered';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseapiService } from '../courseapi.service';
import { BatchapiService } from '../batchapi.service';
import { FacultyapiService } from '../facultyapi.service';

@Component({
  selector: 'app-create-course-offered',
  templateUrl: './create-course-offered.component.html',
  styleUrls: ['./create-course-offered.component.css'],
  providers: [CourseOfferedapiService]
})
export class CreateCourseOfferedComponent {

  courseOffereds = [{courseCode: ''}];
  CourseOffered;
  courses: any = [];
  batches: any = [];
  faculties: any = [];

  submitted = false;

  constructor(
    private courseOfferedService: CourseOfferedapiService,  private api: CourseapiService,
    private batchService: BatchapiService, private facultyService: FacultyapiService,
    private router: Router)

  {
    this.CourseOffered = {CoursesOfferedID: '' , ofr_term: '', ofr_year: '', courseCode: '', batchName: '', sectionName: '', facultyID: ''}
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

  createCourseOffered = () => {
    this.courseOfferedService.createCourseOffered(this.CourseOffered).subscribe(
      data => {
        this.courseOffereds.push(data);
      },
      error => {
        console.log(error);
      }
    );

    this.submitted = false;
    this.gotoList();
  }

    onSubmit() {
    this.submitted = true;
    this.createCourseOffered();
  }

  gotoList() {
    this.router.navigate(['/courseOffered']);
  }
}
