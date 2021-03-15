import { Component, OnInit } from "@angular/core";
import { ProgramapiService } from "../programapi.service";
import { DepartmentapiService } from "../departmentapi.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Program } from "../program";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-program",
  templateUrl: "./program.component.html",
  styleUrls: ["./program.component.css"],
})
export class ProgramComponent {
  title = "List of Program";
  searchText;

  programs = [];
  tempPrograms = [];
  selectedProgram;

  departments = [];
  selectedDepartment;

  id: number;
  program: Program;
  isLoggedIn: boolean;

  constructor(
    private api: ProgramapiService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private deptapi: DepartmentapiService
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
    // this.programs = [{ programCode: "115", pro_name: "test" , DepartmentID: 0,departmentName: 'sd'}]
    this.selectedProgram = {
      programCode: "-1",
      pro_name: "test",
      pro_shortForm: "",
      DepartmentID: "",
      pro_type: "",
    };
    // this.getPrograms();
  }

  ngOnInit() {
    this.program = new Program();
    this.id = this.route.snapshot.params["id"];

    if (!this.id) {
      this.getPrograms();
    } else {
      this.api.getOneProgram(this.id).subscribe(
        (data) => {
          console.log(data);
          this.programs = data;
         
        },
        (error) => console.log(error)
      );
    }
  }

  getPrograms = () => {
    this.api.getAllPrograms().subscribe(
      (data) => {
        // this.programs = data;
        this.tempPrograms = data;
        let i = 0;
        console.log('programs..',data)
        data.forEach((prgm,index) => {
          this.deptapi.getOneDepartment(prgm.DepartmentID).subscribe(res => {
            let program  = {
              programCode: '',
              pro_name: '',
              pro_type: '',
              pro_shortForm: '',
              departmentName: ''
            }
            program.programCode = this.tempPrograms[index].programCode;
            program.pro_name = this.tempPrograms[index].pro_name;
            program.pro_type = this.tempPrograms[index].pro_type;
            program.pro_shortForm = this.tempPrograms[index].pro_shortForm;
            program.departmentName = res.dpt_name;
            this.programs.push(program)
            console.log('departments: ',this.programs)
          })
          i++;
        })
       
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getAllProgram = (id) => {
    this.api.getAllProgram(id).subscribe(
      (data) => {
        this.programs = data;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  deleteProgram = (programCode) => {
    this.programs = this.programs.filter((program) => {
      return program.programCode !== programCode;
    });
    // this.api.deleteProgram(programCode).subscribe(
    //   (data) => {
    //     this.getPrograms();
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  };

  gotoBatch() {
    this.router.navigate(["batch"]);
  }

  gotoCourse() {
    this.router.navigate(["course"]);
  }

  Createprogram() {
    this.router.navigate(["addprogram"]);
  }

  programDetails(programCode) {
    this.router.navigate(["programdetails", programCode]);
  }

  Updateprogram(programCode) {
    this.router.navigate(["updateprogram", programCode]);
  }
}
