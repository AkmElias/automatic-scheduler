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

  programs = [{ programCode: "115", pro_name: "test" }];
  selectedProgram;

  departments = [{ dpt_name: "test" }];
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
    this.selectedProgram = {
      programCode: "-1",
      pro_name: "test",
      pro_shortForm: "",
      DepartmentID: "",
      pro_type: "",
    };
    this.getPrograms();
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
        this.programs = data;
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
