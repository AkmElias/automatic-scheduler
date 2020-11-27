import { Component, OnInit } from "@angular/core";
import { Program } from "../program";
import { ActivatedRoute, Router } from "@angular/router";
import { ProgramapiService } from "../programapi.service";
import { DepartmentapiService } from "../departmentapi.service";

@Component({
  selector: "app-update-program",
  templateUrl: "./update-program.component.html",
  styleUrls: ["./update-program.component.css"],
  providers: [ProgramapiService],
})
export class UpdateProgramComponent implements OnInit {
  id: number;
  program: Program;
  departments: any = [];

  constructor(
    private route: ActivatedRoute,
    private programService: ProgramapiService,
    private router: Router,
    private api: DepartmentapiService
  ) {
    this.getDepartments();
  }

  getDepartments = () => {
    this.api.getAllDepartments().subscribe(
      (data) => {
        this.departments = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  ngOnInit() {
    this.program = new Program();

    this.id = this.route.snapshot.params["id"];

    this.programService.getProgramsByProgramCode(this.id).subscribe(
      (data) => {
        console.log(data);
        this.program = data[0];
      },
      (error) => console.log(error)
    );
  }

  updateProgram() {
    this.programService.updateProgram(this.program).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    this.program = new Program();
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(["/program"]);
  }
}

// import { Component, OnInit } from '@angular/core';
// import { Program } from '../program';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ProgramapiService } from '../programapi.service';

// @Component({
//   selector: 'app-update-program',
//   templateUrl: './update-program.component.html',
//   styleUrls: ['./update-program.component.css'],
//   providers: [ProgramapiService]
// })
// export class UpdateProgramComponent implements OnInit {

// id: number;
// program: Program;

// programs = [{pro_name: 'test'}];
// Program;

//   constructor(private route: ActivatedRoute,private router: Router, private programService: ProgramapiService) {

//     this.Program = {programCode: '-1', pro_name: 'test' , pro_shortForm: '', DepartmentID: '', pro_type: ''};

//   }

//   getPrograms = () => {
//     this.programService.getAllPrograms().subscribe(
//       data => {
//         this.programs = data;
//       },
//       error => {
//         console.log(error);
//       }
//     );
//   }

//   ngOnInit() {
//     this.program = new Program();

//     this.id = this.route.snapshot.params['id'];

//     this.programService.getOneProgram(this.id)
//       .subscribe(data => {
//         console.log(data)
//         this.program = data;
//       }, error => console.log(error));
//   }

//   updateProgram() {
//     this.programService.updateProgram(this.program)
//       .subscribe(data => console.log(data), error => console.log(error));
//     this.program = new Program();
//     this.gotoList();
//   }

//   gotoList() {
//     this.router.navigate(['/program']);
//   }

// }
