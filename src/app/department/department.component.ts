import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DepartmentapiService } from '../departmentapi.service';
import { Router } from '@angular/router';
import { DepartmentDetailsComponent } from '../department-details/department-details.component';
import { UpdateDepartmentComponent } from '../update-department/update-department.component';
import { CreateDepartmentComponent } from '../create-department/create-department.component';
import { ProgramDetailsComponent } from '../program-details/program-details.component';
import { ProgramapiService } from '../programapi.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  providers: [DepartmentapiService,ProgramapiService]
})
export class DepartmentComponent  {

title = 'List of Department';
searchText;

departments = [{dpt_name: 'test'}];
selectedDepartment;

program: any = []
programs = [{pro_name: ''}];
selectedProgram;


constructor(private api: DepartmentapiService,private proapi: ProgramapiService,  private router: Router) {

  setTimeout(() => {
    this.getDepartments();
  }, 500);

  this.getDepartments();
  this.selectedDepartment = {DepartmentID: '-1', dpt_code: '' , dpt_name: 'test' };

  this.getPrograms();
  this.selectedProgram = {programCode: '', pro_name: '' , pro_shortForm: '', DepartmentID: '', pro_type: ''};

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
updateDepartment = () => {
  this.api.updateDepartment(this.selectedDepartment).subscribe(
    data => {
      this.getDepartments();
    },
    error => {
      console.log(error);
    }
  );
}
createDepartment = () => {
  this.api.createDepartment(this.selectedDepartment).subscribe(
    data => {
      this.departments.push(data);
    },
    error => {
      console.log(error);
    }
  );
}
deleteDepartment = () => {
  this.api.deleteDepartment(this.selectedDepartment.DepartmentID).subscribe(
    data => {
      this.getDepartments();
    },
    error => {
      console.log(error);
    }
  );
}

getPrograms = () => {
  this.proapi.getAllPrograms().subscribe(
    data => {
      this.programs = data;
    },
    error => {
      console.log(error);
    }
  );
}

// getFaculties = () => {
//   this.deptapi.getAllFaculties().subscribe(
//     data => {
//       this.faculties = data;
//     },
//     error => {
//       console.log(error);
//     }
//   );
// }

programClicked = (program) => {
  console.log(program);
  this.proapi.getOneProgram(program.programCode).subscribe(
    data => {
      this.selectedProgram = data;
    },
    error => {
      console.log(error);
    }
  );
}

programDetails(programCode){
  this.router.navigate(['programdetails', programCode]);
}

gotoProgram(){
  this.router.navigate(['program']);
}


Createdepartment(){
  this.router.navigate(['adddepartment']);
}

departmentDetails(DepartmentID){
  this.router.navigate(['departmentdetails', DepartmentID]);
}

Updatedepartment(DepartmentID){
  this.router.navigate(['updatedepartment', DepartmentID]);
}

}

