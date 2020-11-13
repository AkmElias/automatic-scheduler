import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { ApiService } from '../api.service';
import { ProgramapiService } from '../programapi.service';
import { DepartmentapiService } from '../departmentapi.service';
import { BatchapiService } from '../batchapi.service';
import { CourseapiService } from '../courseapi.service';
import { FacultyapiService } from '../facultyapi.service';
import { Department } from '../department.js';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [UserService, ApiService,ProgramapiService,DepartmentapiService,BatchapiService,CourseapiService,FacultyapiService]
})

export class NavbarComponent {

department: any = [];
departments = [{dpt_name: 'test'}];
selectedDepartment;

program: any = []
programs = [{pro_name: 'test'}];
selectedProgram;

course: any = []
courses = [{crs_title: ''}];
selectedCourse;

batch: any = []
batches = [{batchName: '' }];
selectedBatch;

faculty: any = []
faculties = [{fac_shortName: 'test'}];
selectedFaculty;

constructor(private api: ApiService) {
  this.getDepartments();
  this.selectedDepartment = {DepartmentID: '-1', dpt_code: '' , dpt_name: '' };

  this.getPrograms();
  this.selectedProgram = {programCode: '-1', pro_name: 'test' , pro_shortForm: '', DepartmentID: '', pro_type: ''};

  this.getCourses();
  this.selectedCourse = {courseID: '-1', courseCode: '',  crs_title: 'test', crs_shortName: '', crs_category: '', programCode: '' };

  this.getBatches();
  this.selectedBatch = {id: -1, batchName: '', sectionName: 'A',  programCode: '', bat_term: '', bat_year: '0'};

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

getBatches = () => {
  this.api.getAllBatches().subscribe(
    data => {
      this.batches = data;
    },
    error => {
      console.log(error);
    }
  );
}
batchClicked = (batch) => {
  this.api.getOneBatch(batch.id).subscribe(
    data => {
      this.selectedBatch = data;
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

getDepartment() {
  this.api.getDepartment()
    .subscribe(data => {
      for (const d of (data as any)) {
        this.department.push({
          DepartmentID: d.DepartmentID,
          dpt_name: d.dpt_name
        });
      }
      console.log(this.department);
    });
}
}
