import { FacultyapiService } from '../facultyapi.service';
import { Faculty } from '../faculty';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentapiService } from '../departmentapi.service';

@Component({
  selector: 'app-create-faculty',
  templateUrl: './create-faculty.component.html',
  styleUrls: ['./create-faculty.component.css'],
  providers: [FacultyapiService]
})
export class CreateFacultyComponent {

  faculties = [{fac_designation: ''}];
  Faculty;
  departments: any = [];

  submitted = false;

  constructor(private facultyService: FacultyapiService, private router: Router, private api: DepartmentapiService)
  {
    this.Faculty = {facultyID: '', fac_title: '', fac_firstName: '', fac_lastName: '',
    fac_shortName: '', fac_gender: '', fac_designation: '', DepartmentID: ''};
    this.getDepartments();
  }

  getDepartments = () => {
    this.api.getAllDepartments().subscribe(
      data => {
        this.departments = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  createFaculty = () => {
    this.facultyService.createFaculty(this.Faculty).subscribe(
      data => {
        this.faculties.push(data);
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
    this.createFaculty();
  }

  gotoList() {
    this.router.navigate(['/faculty']);
  }
}
