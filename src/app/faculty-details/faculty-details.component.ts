import { Faculty } from '../faculty';
import { Component, OnInit, Input } from '@angular/core';
import { FacultyapiService } from '../facultyapi.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-faculty-details',
  templateUrl: './faculty-details.component.html',
  styleUrls: ['./faculty-details.component.css'],
  providers: [FacultyapiService]
})
export class FacultyDetailsComponent implements OnInit {

  id: number;
  faculty: Faculty;

  constructor(private route: ActivatedRoute,private router: Router, private facultyService: FacultyapiService) { }

  ngOnInit() {
    this.faculty = new Faculty();

    this.id = this.route.snapshot.params['id'];

    this.facultyService.getFacultyByFacultyID(this.id)
      .subscribe(data => {
        console.log(data)
        this.faculty = data;
      }, error => console.log(error));
  }

// list(){
//   this.router.navigate(['facultylist']);
// }

Facultylist(){
  this.router.navigate(['faculty']);
}

}
