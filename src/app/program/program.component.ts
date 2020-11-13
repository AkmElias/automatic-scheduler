import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProgramapiService } from '../programapi.service';
import { DepartmentapiService } from '../departmentapi.service';
import { Router,ActivatedRoute } from '@angular/router';
import { CreateProgramComponent } from '../create-program/create-program.component';
import { UpdateProgramComponent } from '../update-program/update-program.component';
import { ProgramDetailsComponent } from '../program-details/program-details.component';
import { Program } from '../program';
import { map } from 'rxjs/operators';

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
selectedProgram;

departments = [{dpt_name: 'test'}];
selectedDepartment;

id: number;
program: Program;

// prog =[];

constructor(private api: ProgramapiService, private router: Router,private route: ActivatedRoute,private deptapi: DepartmentapiService) {

  // setTimeout(() => {
  //   this.getPrograms();
  // }, 500);

  this.selectedProgram = {programCode: '-1', pro_name: 'test' , pro_shortForm: '', DepartmentID: '', pro_type: ''};

  // this.programClicked1();
  this.getDepartments();
  this.selectedDepartment = {DepartmentID: '-1', dpt_code: '' , dpt_name: 'test' };
}

//  programClicked1 = () =>
//   {
//     var id = this.route.snapshot.params['id'];

//    this.api.getAllProgram(id).subscribe(

// 	  data => {
//         console.log(data),
// 		  this.selectedProgram = data;
// 		},
// 		error => {
// 		  console.log(error);
//    }
//  );
//   }

ngOnInit() {
  this.program = new Program();

//   this.programsByDepartmentID = this.programs.filter(
//     program => program.DepartmentID === this.program.DepartmentID);
// }

  this.id = this.route.snapshot.params['id'];

  if(!this.id) {

    this.getPrograms();

  }
  else {

    this.api.getOneProgram(this.id)
    .subscribe(data => {
      // prog = [...data]
      // this.prog.push(...data);
      console.log(data)
      this.programs = data;
    }, error => console.log(error));
  }

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

// getProgramsByDepartmentID = () => {
// this.api.getProgramsByDepartmentID()
// .subscribe(data => {
//   console.log(data);
//   this.programs = data;
// }, error => console.log(error));
// }

getAllProgram = (id) => {
  this.api.getAllProgram(id).subscribe(
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
// departmentClicked-- = (department) => {
//   this.api.getOneDepartment(department.DepartmentID).subscribe(
//     data => {
//       this.selectedDepartment = data;
//     },
//     error => {
//       console.log(error);
//     }
//   );
// }

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
