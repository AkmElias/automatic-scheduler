import { Program } from "../program";
import { Component, OnInit, Input } from "@angular/core";
import { ProgramapiService } from "../programapi.service";
import { Router, ActivatedRoute } from "@angular/router";
import { DepartmentapiService } from "../departmentapi.service";

@Component({
  selector: "app-program-details",
  templateUrl: "./program-details.component.html",
  styleUrls: ["./program-details.component.css"],
  providers: [ProgramapiService],
})
export class ProgramDetailsComponent implements OnInit {
  id: number;
  program = {};
  tempProgram = {
    programCode: '',
    pro_name: '',
    pro_shortForm: '',
    department: ''
 }
  // programdetails: null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private programService: ProgramapiService,
    private deptApi: DepartmentapiService
  ) {}

  ngOnInit() {
    this.program = new Program();

    this.id = this.route.snapshot.params["id"];
   
    this.programService.getProgramsByProgramCode(this.id).subscribe(
      (data) => {
        console.log(data);
        this.program = data[0];
        this.tempProgram.programCode = data[0].programCode;
        this.tempProgram.pro_name = data[0].pro_name;
        this.tempProgram.pro_shortForm = data[0].pro_shortForm;
        data.forEach(element => {
          this.deptApi.getOneDepartment(element.DepartmentID).subscribe(res => {
            this.tempProgram.department = res.dpt_name;
          })
        });
      },
      (error) => console.log(error)
    );
  }

  // list(){
  //   this.router.navigate(['programlist']);
  // }

  Programlist() {
    this.router.navigate(["program"]);
  }
}
