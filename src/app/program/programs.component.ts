import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProgramapiService } from '../programapi.service';
import { DepartmentapiService } from '../departmentapi.service';
import { Router } from '@angular/router';
import { CreateProgramComponent } from '../create-program/create-program.component';
import { UpdateProgramComponent } from '../update-program/update-program.component';
import { ProgramDetailsComponent } from '../program-details/program-details.component';


@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css'],
  providers: [ProgramapiService]
})

export class ProgramComponent  {

title = 'List of Program';
searchText;

programs = [{pro_name: 'test'}];
departments = [];

selectedDepartment;
  selectedProgram: { programCode: string; pro_name: string; pro_shortForm: string; DepartmentID: string; pro_type: string; };

constructor(private api: ProgramapiService,
   private departmentApi: DepartmentapiService,
    private router: Router) {

  setTimeout(() => {
    this.getPrograms();
  }, 500);

  this.selectedProgram = {programCode: '-1', pro_name: 'test' , pro_shortForm: '', DepartmentID: '', pro_type: ''};

  this.getDepartments();
  this.selectedDepartment = {DepartmentID: '-1', dpt_code: '' , dpt_name: 'test' };
}
  getDepartments() {
    throw new Error('Method not implemented.');
  }
getPrograms = () => {
  this.api.getAllPrograms().subscribe(
    data => {
      this.programs = data;
      console.log('department: ',data);
      this.programs.forEach(program => {
        this.departmentApi.getOneDepartment(program.DepartmentID).subscribe( data => {
          console.log('department: ',data);
        }
          
        )
      })
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
updateProgram = () => {
  this.api.updateProgram(this.selectedProgram).subscribe(
    data => {
      this.getPrograms();
    },
    error => {
      console.log(error);
    }
  );
}
createProgram = () => {
  this.api.createProgram(this.selectedProgram).subscribe(
    data => {
      this.programs.push(data);
    },
    error => {
      console.log(error);
    }
  );
}
deleteProgram = () => {
  this.api.deleteProgram(this.selectedProgram.programCode).subscribe(
    data => {
      this.getPrograms();
    },
    error => {
      console.log(error);
    }
  );
}

// getDepartments = () => {
//   this.api.getAllDepartments().subscribe(
//     data => {
//       this.departments = data;
//     },
//     error => {
//       console.log(error);
//     }
//   );
// }
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

gotoBatch(){
  this.router.navigate(['batch']);
}

gotoCourse(){
this.router.navigate(['course']);
}

Createprogram(){
  this.router.navigate(['addprogram']);
}

programDetails(programCode){
  this.router.navigate(['programdetails', programCode]);
}

Updateprogram(programCode){
  this.router.navigate(['updateprogram', programCode]);
}

}
