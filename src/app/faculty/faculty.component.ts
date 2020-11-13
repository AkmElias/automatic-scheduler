import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FacultyapiService } from '../facultyapi.service';
import { DepartmentapiService } from '../departmentapi.service';
import { Router,ActivatedRoute } from '@angular/router';
import { CreateFacultyComponent } from '../create-faculty/create-faculty.component';
import { UpdateFacultyComponent } from '../update-faculty/update-faculty.component';
import { FacultyDetailsComponent } from '../faculty-details/faculty-details.component';
import { Faculty } from '../faculty';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css'],
  providers: [FacultyapiService]
})
export class FacultyComponent  {

title = 'List of Faculties';
searchText;

faculties = [{fac_shortName: 'test'}];
selectedFaculty;

departments = [{dpt_name: 'test'}];
selectedDepartment;

id: number;
faculty: Faculty;

constructor(private api: FacultyapiService, private router: Router, private route: ActivatedRoute, private deptapi: DepartmentapiService) {

  // setTimeout(() => {
  //   this.getFaculties();
  // }, 500);

  // this.getFaculties();
  this.selectedFaculty = {facultyID: '-1', fac_title: '', fac_firstName: '', fac_lastName: '',
  fac_shortName: 'test', fac_gender: '', fac_designation: '', DepartmentID: ''};

  this.getDepartments();
  this.selectedDepartment = {DepartmentID: '-1', dpt_code: '' , dpt_name: 'test' };
}


ngOnInit() {
  this.faculty = new Faculty();

  this.id = this.route.snapshot.params['id'];

  if(!this.id) {

    this.getFaculties();

  }
  else {

    this.api.getOneFaculty(this.id)
    .subscribe(data => {
      console.log(data)
      this.faculties = data;
    }, error => console.log(error));
  }

}

getFaculties = () => {
  this.api.getAllFaculties().subscribe(
    data => {
      this.faculties = data;
    },
    error => {
      console.log(error);
    }
  );
}
facultyClicked = (faculty) => {
  this.api.getOneFaculty(faculty.facultyID).subscribe(
    data => {
      this.selectedFaculty = data;
    },
    error => {
      console.log(error);
    }
  );
}
updateFaculty = () => {
  this.api.updateFaculty(this.selectedFaculty).subscribe(
    data => {
      this.getFaculties();
    },
    error => {
      console.log(error);
    }
  );
}
createFaculty = () => {
  this.api.createFaculty(this.selectedFaculty).subscribe(
    data => {
      this.faculties.push(data);
    },
    error => {
      console.log(error);
    }
  );
}
deleteFaculty = () => {
  this.api.deleteFaculty(this.selectedFaculty.facultyID).subscribe(
    data => {
      this.getFaculties();
    },
    error => {
      console.log(error);
    }
  );
}

getDepartments = () => {
  this.deptapi.getAllDepartments().subscribe(
    data => {
      this.departments = data;
    },
    error => {
      console.log(error);
    }
  );
}

gotoCourseOffered(){
  this.router.navigate(['courseOffered']);
}

Createfaculty(){
  this.router.navigate(['addfaculty']);
}

facultyDetails(facultyID){
  this.router.navigate(['facultydetails', facultyID]);
}

Updatefaculty(facultyID){
  this.router.navigate(['updatefaculty', facultyID]);
}

}
