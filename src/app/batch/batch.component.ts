import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BatchapiService } from "../batchapi.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Batch } from "../batch";

@Component({
  selector: "app-batch",
  templateUrl: "./batch.component.html",
})
export class BatchComponent {
  title = "List of Batch";
  searchText;

  batches = [{ id: 1, batchName: "" }];
  section = 1;
  selectedBatch;

  programs = [{ pro_name: "" }];
  selectedProgram;

  id: number;
  batch: Batch;

  constructor(
    private api: BatchapiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.getBatches();
    this.selectedBatch = {
      id: -1,
      batchName: "0",
      sectionName: "",
      programCode: -1,
      bat_term: "",
      bat_year: -1,
    };
  }

  ngOnInit() {
    this.batch = new Batch();

    this.id = this.route.snapshot.params["id"];

    if (!this.id) {
      this.getBatches();
    } else {
      this.api.getOneBatch(this.id).subscribe(
        (data) => {
          console.log(data);
          this.batches = data;
        },
        (error) => console.log(error)
      );
    }
  }

  getBatches = () => {
    this.api.getAllBatches().subscribe(
      (data) => {
        this.batches = data;
        console.log(" sucesee test askhdsakjhcdaskl as;kc :", data);
      },
      (error) => {
        console.log(" error test askhdsakjhcdaskl as;kc :");
        console.log(error);
      }
    );
  };
  deleteBatch = (batchID) => {
    this.batches = this.batches.filter((batch) => batch.id != batchID);

    // this.api.deleteBatch(this.selectedBatch.id).subscribe(
    //   data => {
    //     this.getBatches();
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  };

  gotoCourseOffered() {
    this.router.navigate(["courseOffered"]);
  }

  Createbatch() {
    this.router.navigate(["addbatch"]);
  }

  batchDetails(id) {
    this.router.navigate(["batchdetails", id]);
  }

  Updatebatch(id) {
    this.router.navigate(["updatebatch", id]);
  }
}
