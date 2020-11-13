import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  // template: '<ejs-schedule></ejs-schedule>',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, ApiService]
})

export class AppComponent {
departments = [{dpt_name: 'test'}];
selectedDepartment;

programs = [{pro_name: 'test'}];
selectedProgram;

faculties = [{fac_shortName: 'test'}];
selectedFaculty;

constructor(private api: ApiService) {
  this.getDepartments();
  this.selectedDepartment = {DepartmentID: '-1', dpt_code: '' , dpt_name: '' };

  this.getPrograms();
  this.selectedProgram = {programCode: '-1', pro_name: 'test' , pro_shortForm: '', DepartmentID: '', pro_type: ''};

  this.getFaculties();
  this.selectedFaculty = {facultyID: '-1', fac_title: '', fac_firstName: '', fac_lastName: '',
  fac_shortName: 'test', fac_gender: '', fac_designation: '', DepartmentID: ''};
}
getDepartments = () => {
  this.api.getAllDepartments().subscribe(
    data => {
      this.departments = data;
    },
    error => {
      console.log(error);
    }
  );
}
departmentClicked = (department) => {
  this.api.getOneDepartment(department.DepartmentID).subscribe(
    data => {
      this.selectedDepartment = data;
    },
    error => {
      console.log(error);
    }
  );
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
programClicked = (program) => {
  this.api.getOneProgram(program.programCode).subscribe(
    data => {
      this.selectedProgram = data;
    },
    error => {
      console.log(error);
    }
  );
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
}
