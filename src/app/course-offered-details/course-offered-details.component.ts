import { CourseOffered } from './../course-offered';
import { Component, OnInit, Input } from '@angular/core';
import { CourseOfferedapiService } from '../course-offeredapi.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-offered-details',
  templateUrl: './course-offered-details.component.html',
  styleUrls: ['./course-offered-details.component.css'],
  providers: [CourseOfferedapiService]
})
export class CourseOfferedDetailsComponent implements OnInit {

  id: number;
  courseOfferedInfo: any
  courseOffered: CourseOffered;

  constructor(private route: ActivatedRoute,private router: Router, private courseOfferedService: CourseOfferedapiService) { }

  ngOnInit() {
    this.courseOffered = new CourseOffered();

    this.id = this.route.snapshot.params['id'];
    this.courseOfferedInfo = this.route.snapshot.queryParamMap.get('info')

    console.log('id: ', this.id)

   
  }

// list(){
//   this.router.navigate(['courseOfferedlist']);
// }

gotoList(){
  this.router.navigate(['courseOffered']);
}

}
