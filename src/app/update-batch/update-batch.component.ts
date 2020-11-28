import { ProgramapiService } from "../programapi.service";
import { Component, OnInit } from "@angular/core";
import { Batch } from "../batch";
import { ActivatedRoute, Router } from "@angular/router";
import { BatchapiService } from "../batchapi.service";

@Component({
  selector: "app-update-batch",
  templateUrl: "./update-batch.component.html",
  styleUrls: ["./update-batch.component.css"],
})
export class UpdateBatchComponent implements OnInit {
  id: number;
  batch: Batch;
  programs: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private batchService: BatchapiService,
    private programApi: ProgramapiService
  ) {}

  ngOnInit() {
    this.batch = new Batch();

    this.id = this.route.snapshot.params["id"];
    this.getPrograms();
    this.batchService.getBatchByID(this.id).subscribe(
      (data) => {
        console.log(data);
        this.batch = data[0];
      },
      (error) => console.log(error)
    );
  }

  getPrograms = () => {
    this.programApi.getAllPrograms().subscribe((data) => {
      this.programs = data;
    });
  };

  updateBatch() {
    this.batchService.updateBatch(this.batch).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    this.batch = new Batch();
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(["/batch"]);
  }
}
