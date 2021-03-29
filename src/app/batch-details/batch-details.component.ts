import { SectionapiService } from "./../sectionapi.service";
import { Batch } from "../batch";
import { Component, OnInit, Input } from "@angular/core";
import { BatchapiService } from "../batchapi.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-batch-details",
  templateUrl: "./batch-details.component.html",
  styleUrls: ["./batch-details.component.css"],
  providers: [BatchapiService],
})
export class BatchDetailsComponent implements OnInit {
  id: number;
  batch: Batch;
  sections: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authApi: AuthService,
    private batchService: BatchapiService,
    private sectionApi: SectionapiService
  ) {
    if(!this.authApi.isLoggedIn()){
      this.router.navigateByUrl('/login')
    }
  }

  ngOnInit() {
    this.batch = new Batch();

    this.id = this.route.snapshot.params["id"];

    this.batchService.getBatchByID(this.id).subscribe(
      (data) => {
        this.batch = data;
        this.sectionApi.getSectionsByBatch(data[0].id).subscribe((data) => {
          this.sections = data;
          console.log("sections", data);
        });
      },
      (error) => console.log(error)
    );
  }

  // list(){
  //   this.router.navigate(['batchlist']);
  // }

  Batchlist() {
    this.router.navigate(["batch"]);
  }
}
