import { CourseOffered } from './../course-offered';
import { SectionapiService } from './../sectionapi.service';
import { FacultyapiService } from './../facultyapi.service';
import { CourseapiService } from './../courseapi.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseOfferedapiService } from '../course-offeredapi.service';
import {BatchapiService} from '../batchapi.service';
import { Router } from '@angular/router';
import { CreateCourseOfferedComponent } from '../create-course-offered/create-course-offered.component';
import { UpdateCourseOfferedComponent } from '../update-course-offered/update-course-offered.component';
import { CourseOfferedDetailsComponent } from '../course-offered-details/course-offered-details.component';

@Component({
  selector: 'app-course-offered',
  templateUrl: './course-offered.component.html',
  styleUrls: ['./course-offered.component.css'],
  providers: [CourseOfferedapiService]
})
export class CourseOfferedComponent  {

title = 'List of CourseOffered';

coursesOffered = [];
finalCoursesOffered = [];

sectionOne = true;
sectionTwo = false;
sectionThree = false;
one = '';
two = '';
three = '';
dash: String;

constructor(private api: CourseOfferedapiService, private batchApi: BatchapiService,
  private courseApi: CourseapiService, private facultyApi: FacultyapiService, private sectionApi: SectionapiService,
   private router: Router) {

  this.getCoursesOffered();
  
}

getCoursesOffered = () => {

    this.api.getAllCoursesOffered().subscribe(
      data => {

        this.coursesOffered = data; 
        let courseOfferObject;
        let courseObject;
        let batchObject;
        let sectionObject;
        let facultyObject;
        
        this.coursesOffered.forEach(courseOffer => {
          let tempCourseOffer = {
            'id': Number,
            'term': String,
            'year': String,
            'batch': String,
            'section': String,
            'course': String,
            'faculty': String
          }
          tempCourseOffer.id = courseOffer.id
          tempCourseOffer.term = courseOffer.ofr_term
          tempCourseOffer.year = courseOffer.ofr_year
        
          this.batchApi.getOneBatch(courseOffer.batchName).subscribe(
            data => {
              
              batchObject = data[0];
              tempCourseOffer.batch = batchObject.batchName

              this.sectionApi.getOneSection(courseOffer.sectionName).subscribe(
                data => {
                  
                  sectionObject = data;
                  tempCourseOffer.section = sectionObject.sectionName
                  this.courseApi.getOneCourse(courseOffer.courseID).subscribe(
                    data => {

                      courseObject = data[0];
                      this.dash = ", ";
                      tempCourseOffer.course = courseObject.courseCode + this.dash + courseObject.crs_title;
                      this.facultyApi.getOneFaculty(courseOffer.facultyID).subscribe(
                        data => {

                          facultyObject = data[0];
                          this.dash = " ";
                          tempCourseOffer.faculty = facultyObject.fac_firstName + this.dash + facultyObject.fac_lastName
                          console.log('offers',tempCourseOffer)
                        }
                      )
                    }
                  )
              
                }
              );
          
            }
          ); 

          this.finalCoursesOffered.push(tempCourseOffer);

        })
      
      },
      error => {
        console.log(error);
      }
    ); 

}


deleteCourseOffered = (courseOfferedID) => {
  console.log('delete id: ', courseOfferedID)
  this.finalCoursesOffered = this.finalCoursesOffered.filter(courseOffered => courseOffered.id !== courseOfferedID)
  
  // this.api.deleteCourseOffered(courseOfferedID).subscribe(
  //   data => {
  //     console.log('deleted CourseOffered Id:', data)
  //   },
  //   error => {
  //     console.log(error);
  //   }
  // );

}

stepOne() {
  this.sectionTwo = true;
  this.sectionOne = true;
}

stepTwo() {
  this.sectionThree = true;
  this.sectionOne = true;
  this.sectionTwo = true;
}

stepThree() {
  this.sectionThree = false;
  this.sectionTwo = false;
  this.sectionOne = false;
}

CreatecourseOffered(){
  this.router.navigate(['addcourseOffered']);
}

courseOfferedDetails(courseOfferedID){
  this.router.navigate(['courseOffereddetails',courseOfferedID]);
}

updateCourseOffered(courseOfferedID){
  this.router.navigate(['updatecourseOffered', courseOfferedID]);
}

}
