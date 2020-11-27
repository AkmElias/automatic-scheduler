import { Program } from "../program";
import { Component, OnInit, Input } from "@angular/core";
import { ProgramapiService } from "../programapi.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-program-details",
  templateUrl: "./program-details.component.html",
  styleUrls: ["./program-details.component.css"],
  providers: [ProgramapiService],
})
export class ProgramDetailsComponent implements OnInit {
  id: number;
  program: Program;

  // programdetails: null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private programService: ProgramapiService
  ) {}

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

  // list(){
  //   this.router.navigate(['programlist']);
  // }

  Programlist() {
    this.router.navigate(["program"]);
  }
}
