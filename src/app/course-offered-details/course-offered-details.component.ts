import { ProgramapiService } from './../programapi.service';
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
    private programApi: ProgramapiService,
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

  this.courseOfferedService.getOneCourseOffered(courseOfferedId).subscribe(data => {

    this.courseOffered = data[0];
    this.courseOfferedInfo.term = this.courseOffered.ofr_term
    this.courseOfferedInfo.year = this.courseOffered.ofr_year
    this.courseOfferedInfo.id = this.courseOffered.id
    console.log('courseOffered..',this.courseOffered)
    this.batchApi.getOneBatch(this.courseOffered.batchName).subscribe(
      data => {
        
        this.courseOfferedInfo.batch = data[0].batchName

        this.sectionApi.getOneSection(this.courseOffered.sectionName).subscribe(
          data => {
            
           this.courseOfferedInfo.section = data.sectionName
            this.courseApi.getOneCourse(this.courseOffered.courseID).subscribe(
              data => {

                this.dash = ", ";
                this.courseOfferedInfo.course = data[0].courseCode + this.dash + data[0].crs_title;
                this.facultyApi.getOneFaculty(this.courseOffered.facultyID).subscribe(
                  data => {

                    this.dash = " ";
                    this.courseOfferedInfo.faculty = data[0].fac_firstName + this.dash + data[0].fac_lastName
                    this.programApi.getOneProgram(this.courseOffered.programID).
                    subscribe(data => {

                       this.courseOfferedInfo.program = data[0].pro_name
                       
                    })
                   
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
