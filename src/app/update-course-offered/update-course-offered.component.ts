import { UpdateCourseOffered } from './../updateCourseOffered';
import { ProgramapiService } from './../programapi.service';
import { SectionapiService } from './../sectionapi.service';
import { CourseOffered } from './../course-offered';
import { Component, OnInit } from '@angular/core';
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

courseOfferedUpdate: any;
id: number;
dash: String;
courseOfferedInfo: any;
courseOffered: any;
courses: any = [];
batches: any = [];
faculties: any = [];
programs = [{programName: "Computer Science & Engineeering"},{programName: 'Electrical and Electronix Engineering'}];
sections = [{sectionName: 'A'},{sectionName: 'B'},{sectionName: 'C'}];


  constructor(
    private api: CourseOfferedapiService, 
    private programApi: ProgramapiService,
    private courseApi: CourseapiService,
    private batchApi: BatchapiService,
    private sectionApi: SectionapiService,
    private facultyApi: FacultyapiService,
    private router: Router, private route: ActivatedRoute)

    {
      this.courseOfferedInfo = CourseOffered
      this.id = this.route.snapshot.params['id'];
      this.courseOfferedUpdate = new UpdateCourseOffered()

      this.getCourseOffered(this.id);
      this.getCourses()
      this.getPrograms();
      this.getBatches();
      this.getSections()
      this.getFaculties();
    }

    getCourseOffered(courseOfferedId){
         this.api.getOneCourseOffered(courseOfferedId).subscribe(data => {

          this.courseOffered = data[0];
          this.courseOfferedInfo.term = this.courseOffered.ofr_term
          this.courseOfferedInfo.year = this.courseOffered.ofr_year
          this.courseOfferedInfo.id = this.courseOffered.id
          
          this.batchApi.getOneBatch(this.courseOffered.batchName).subscribe(
            data => {
              
              this.courseOfferedInfo.batch = data[0].batchName
              console.log('courseOffered..',this.courseOffered[0].sectionName)
              this.sectionApi.getOneSection(this.courseOffered[0].sectionName).subscribe(
                data => {
                  
                this.courseOfferedInfo.section = data.sectionName
                  this.courseApi.getOneCourse(this.courseOffered[0].courseID).subscribe(
                    data => {

                      this.dash = ", ";
                      this.courseOfferedInfo.course = data[0].courseCode + this.dash + data[0].crs_title;
                      this.facultyApi.getOneFaculty(this.courseOffered[0].facultyID).subscribe(
                        data => {

                          this.dash = " ";
                          this.courseOfferedInfo.faculty = data[0].fac_firstName + this.dash + data[0].fac_lastName
                          this.programApi.getOneProgram(this.courseOffered[0].programID).
                          subscribe(data => {
                            
                            this.courseOfferedInfo.program = data[0].pro_name
                            console.log('courseOffered..',this.courseOfferedInfo.section)
                            
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

    getPrograms = () => {

      this.programApi.getAllPrograms().subscribe(data=> {
        console.log('programms',data)
      })

    }

    getCourses = () => {
    this.courseApi.getAllCourses().subscribe(data=> {
      console.log('courses',data)
    })
    }

    getBatches = () => {
      this.batchApi.getAllBatches().subscribe(
        data => {
          this.batches = data;
        },
        error => {
          console.log(error);
        }
      );
    }


    getSections = () => {
      this.sectionApi.getAllSections().subscribe(data=> {
        console.log('sections..',data)
      })
    }

    getFaculties = () => {
      this.facultyApi.getAllFaculties().subscribe(
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
   
    this.courseOfferedUpdate = new UpdateCourseOffered();
   
    this.id = this.route.snapshot.params['id'];
   
    this.courseOfferedUpdate = {

    }
    //console.log(this.courseOfferedUpdate)

    this.api.getOneCourseOffered(this.id)
      .subscribe(data => {
        console.log(data)
        this.courseOffered = data;
      }, error => console.log(error));

  }

  updateCourseOffered() {
    this.courseOfferedUpdate = {
      id: 4,
      ofr_term: 'Spring',
      ofr_year: 2020,
      program: '115',
      course: 3,
      batch: 5,
      section: 5,
      faculty: 6
   }
    
    this.api.updateCourseOffered(this.courseOfferedUpdate)
      .subscribe(data => console.log(data), error => console.log(error));
    // this.courseOffered = new CourseOffered();
    // this.gotoList();
  }

  gotoList() {
    this.router.navigate(['/courseOffered']);
  }

}
