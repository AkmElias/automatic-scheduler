import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseapiService } from '../courseapi.service';
import { CreateCourseComponent } from '../create-course/create-course.component';
import { UpdateCourseComponent } from '../update-course/update-course.component';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { ProgramapiService } from '../programapi.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Course } from '../course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  providers: [CourseapiService]
})
export class CourseComponent  {

title = 'List of Course';
searchText;

courses = [{crs_title: ''}];
selectedCourse;

programs = [{pro_name: 'test'}];
selectedProgram;

id: number;
course: Course;

constructor(private api: CourseapiService, private router: Router, private route: ActivatedRoute, private proapi: ProgramapiService){

  // setTimeout(() => {
  //   this.getCourses();
  // }, 500);

  this.getCourses();
  this.selectedCourse = {courseID: '-1', courseCode: 'test',  crs_title: '', crs_shortName: '', crs_category: '', programCode: '' };

  this.getPrograms();
  this.selectedProgram = {programCode: '-1', pro_name: 'test' , pro_shortForm: '', DepartmentID: '', pro_type: ''};
}

ngOnInit() {
  this.course = new Course();

  this.id = this.route.snapshot.params['id'];

  if(!this.id) {

    this.getCourses();

  }
  else {

    this.api.getOneCourse(this.id)
    .subscribe(data => {
      console.log(data)
      this.courses = data;
    }, error => console.log(error));
  }

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
courseClicked = (course) => {
  this.api.getOneCourse(course.courseCode).subscribe(
    data => {
      this.selectedCourse = data;
    },
    error => {
      console.log(error);
    }
  );
}
updateCourse = () => {
  this.api.updateCourse(this.selectedCourse).subscribe(
    data => {
      this.getCourses();
    },
    error => {
      console.log(error);
    }
  );
}
createCourse = () => {
  this.api.createCourse(this.selectedCourse).subscribe(
    data => {
      this.courses.push(data);
    },
    error => {
      console.log(error);
    }
  );
}
deleteCourse = () => {
  this.api.deleteCourse(this.selectedCourse.courseCode).subscribe(
    data => {
      this.getCourses();
    },
    error => {
      console.log(error);
    }
  );
}

getPrograms = () => {
  this.proapi.getAllPrograms().subscribe(
    data => {
      this.programs = data;
    },
    error => {
      console.log(error);
    }
  );
}

programClicked = (program) => {
  this.proapi.getOneProgram(program.programCode).subscribe(
    data => {
      this.selectedProgram = data;
    },
    error => {
      console.log(error);
    }
  );
}

gotoCourseOffered(){
  this.router.navigate(['courseOffered']);
}

Createcourse(){
  this.router.navigate(['addcourse']);
}

courseDetails(courseID){
  this.router.navigate(['coursedetails', courseID]);
}

Updatecourse(courseID){
  this.router.navigate(['updatecourse', courseID]);
}
}


