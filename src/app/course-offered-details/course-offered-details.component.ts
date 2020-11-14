import { CourseOffered } from './../course-offered';
import { Component, OnInit, Input } from '@angular/core';
import { CourseOfferedapiService } from '../course-offeredapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SectionapiService } from './../sectionapi.service';
import { FacultyapiService } from './../facultyapi.service';
import { CourseapiService } from './../courseapi.service';
import {BatchapiService} from '../batchapi.service';


@Component({
  selector: 'app-course-offered-details',
  templateUrl: './course-offered-details.component.html',
  styleUrls: ['./course-offered-details.component.css'],
  providers: [CourseOfferedapiService]
})
export class CourseOfferedDetailsComponent implements OnInit {

  id: number;
  courseOfferedInfo: any
  courseOffered: any;
  dash: String

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private courseOfferedService: CourseOfferedapiService,
    private batchApi: BatchapiService,
    private courseApi: CourseapiService,
    private facultyApi: FacultyapiService, 
    private sectionApi: SectionapiService,) { 
    this.courseOfferedInfo = CourseOffered
    this.id = this.route.snapshot.params['id'];
    this.getCourseOfferedDetails(this.id);
    }

  ngOnInit() {

   
  }



getCourseOfferedDetails(courseOfferedId){

  let courseOfferObject;
  let courseObject;
  let batchObject;
  let sectionObject;
  let facultyObject;

  this.courseOfferedService.getOneCourseOffered(courseOfferedId).subscribe(data => {

    this.courseOffered = data[0];
    this.courseOfferedInfo.term = this.courseOffered.ofr_term
    this.courseOfferedInfo.year = this.courseOffered.ofr_year
    this.courseOfferedInfo.id = this.courseOffered.id
    console.log('courseOffered..',this.courseOffered)
    this.batchApi.getOneBatch(this.courseOffered.batchName).subscribe(
      data => {
        
        batchObject = data[0];
        console.log('batch..',batchObject)
        this.courseOfferedInfo.batch = batchObject.batchName

        this.sectionApi.getOneSection(this.courseOffered.sectionName).subscribe(
          data => {
            
            sectionObject = data;
            console.log('section..',sectionObject)
           this.courseOfferedInfo.section = sectionObject.sectionName
            this.courseApi.getOneCourse(this.courseOffered.courseID).subscribe(
              data => {

                courseObject = data[0];
                console.log('course..',courseObject)
                this.dash = ", ";
                this.courseOfferedInfo.course = courseObject.courseCode + this.dash + courseObject.crs_title;
                this.facultyApi.getOneFaculty(this.courseOffered.facultyID).subscribe(
                  data => {

                    facultyObject = data[0];
                    console.log('fac....',facultyObject)
                    this.dash = " ";
                    this.courseOfferedInfo.faculty = facultyObject.fac_firstName + this.dash + facultyObject.fac_lastName
                    console.log('offers',this.courseOfferedInfo)
                  }
                )
                
              }
            )
        
          }
        );
    
      }
    );   

  })
   
}

gotoList(){
  this.router.navigate(['courseOffered']);
}

}
