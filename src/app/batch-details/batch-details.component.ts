import { Batch } from '../batch';
import { Component, OnInit, Input } from '@angular/core';
import { BatchapiService } from '../batchapi.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-batch-details',
  templateUrl: './batch-details.component.html',
  styleUrls: ['./batch-details.component.css'],
  providers: [BatchapiService]
})
export class BatchDetailsComponent implements OnInit {

  id: number;
  batch: Batch;

  constructor(private route: ActivatedRoute,private router: Router, private batchService: BatchapiService) { }

  ngOnInit() {
    this.batch = new Batch();

    this.id = this.route.snapshot.params['id'];

    this.batchService.getBatchByID(this.id)
      .subscribe(data => {
        console.log(data)
        this.batch = data;
      }, error => console.log(error));
  }

// list(){
//   this.router.navigate(['batchlist']);
// }

Batchlist(){
  this.router.navigate(['batch']);
}

}
