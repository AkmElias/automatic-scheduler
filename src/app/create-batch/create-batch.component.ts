import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BatchapiService } from "../batchapi.service";
import { Router } from "@angular/router";
import { ProgramapiService } from "../programapi.service";

@Component({
  selector: "app-create-batch",
  templateUrl: "./create-batch.component.html",
  styleUrls: ["./create-batch.component.css"],
})
export class CreateBatchComponent {
  batches = [{ batchName: "" }];
  Batch;
  programs: any = [];

  submitted = false;
  isLoggedIn: boolean;
  constructor(
    private batchService: BatchapiService,
    private router: Router,
    private api: ProgramapiService,
    private authService: AuthService
  ) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl("/");
    }
    this.Batch = {
      id: -1,
      batchName: "",
      programCode: "",
      bat_term: "",
      bat_year: "",
    };
    this.getPrograms();
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

  createBatch = () => {
    this.batchService.createBatch(this.Batch).subscribe(
      (data) => {
        this.batches.push(data);
      },
      (error) => {
        console.log(error);
      }
    );

    this.submitted = false;
    this.gotoList();
  };

  onSubmit() {
    this.submitted = true;
    this.createBatch();
  }

  gotoList() {
    this.router.navigate(["/batch"]);
  }
}
