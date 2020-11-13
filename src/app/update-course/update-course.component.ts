import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseapiService } from '../courseapi.service';
import { ProgramapiService } from '../programapi.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css'],
  providers: [CourseapiService]
})
export class UpdateCourseComponent implements OnInit {

id: number;
course: Course;
programs: any = [];

  constructor(private route: ActivatedRoute,private router: Router, private courseService: CourseapiService, private api: ProgramapiService)
  {
    this.getPrograms()
  }

  getPrograms = () => {
    this.api.getAllPrograms().subscribe(
      data => {
        this.programs = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.course = new Course();

    this.id = this.route.snapshot.params['id'];

    this.courseService.getCourseByCourseID(this.id)
      .subscribe(data => {
        console.log(data)
        this.course = data;
      }, error => console.log(error));
  }

  updateCourse() {
    this.courseService.updateCourse(this.course)
      .subscribe(data => console.log(data), error => console.log(error));
    this.course = new Course();
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(['/course']);
  }


}
