import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BatchapiService } from '../batchapi.service';
import { ProgramapiService } from '../programapi.service';
import { CreateBatchComponent } from '../create-batch/create-batch.component';
import { UpdateBatchComponent } from '../update-batch/update-batch.component';
import { BatchDetailsComponent } from '../batch-details/batch-details.component';
import { Router,ActivatedRoute } from '@angular/router';
import { Batch } from '../batch';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css'],
  providers: [BatchapiService]
})
export class BatchComponent  {

title = 'List of Batch';
searchText;

batches = [{batchName: '' }];
selectedBatch;

programs = [{pro_name: ''}];
selectedProgram;

id: number;
batch: Batch;

constructor(private api: BatchapiService, private router: Router, private route: ActivatedRoute, private proapi: ProgramapiService) {

  // setTimeout(() => {
  //   this.getBatches();
  // }, 500);

  // this.getBatches();
  this.selectedBatch = {id: -1, batchName: '0', sectionName: '',  programCode: -1, bat_term: '', bat_year: -1};

  this.getPrograms();
  this.selectedProgram = {programCode: '-1', pro_name: '' , pro_shortForm: '', DepartmentID: '', pro_type: ''};
}


ngOnInit() {
  this.batch = new Batch();

  this.id = this.route.snapshot.params['id'];

  if(!this.id) {

    this.getBatches();

  }
  else {

    this.api.getOneBatch(this.id)
    .subscribe(data => {
      console.log(data)
      this.batches = data;
    }, error => console.log(error));
  }

}

getBatches = () => {
  this.api.getAllBatches().subscribe(
    data => {
      this.batches = data;
      console.log(' sucesee test askhdsakjhcdaskl as;kc :', data);
    },
    error => {
      console.log(' error test askhdsakjhcdaskl as;kc :');
      console.log(error);
    }
  );
}
batchClicked = (batch) => {
  this.api.getOneBatch(batch.id).subscribe(
    data => {
      this.selectedBatch = data;
    },
    error => {
      console.log(error);
    }
  );
}
updateBatch = () => {
  this.api.updateBatch(this.selectedBatch).subscribe(
    data => {
      this.getBatches();
    },
    error => {
      console.log(error);
    }
  );
}
createBatch = () => {
  this.api.createBatch(this.selectedBatch).subscribe(
    data => {
      this.batches.push(data);
    },
    error => {
      console.log(error);
    }
  );
}
deleteBatch = () => {
  this.api.deleteBatch(this.selectedBatch.id).subscribe(
    data => {
      this.getBatches();
    },
    error => {
      console.log(error);
    }
  );
}

getPrograms = () => {
  this.proapi.getAllPrograms().subscribe(
    data => {
      this.programs = data;
    },
    error => {
      console.log(error);
    }
  );
}

programClicked = (program) => {
  this.proapi.getOneProgram(program.programCode).subscribe(
    data => {
      this.selectedProgram = data;
    },
    error => {
      console.log(error);
    }
  );
}

gotoCourseOffered(){
  this.router.navigate(['courseOffered']);
}

Createbatch(){
  this.router.navigate(['addbatch']);
}

batchDetails(id){
  this.router.navigate(['batchdetails', id]);
}

Updatebatch(id){
  this.router.navigate(['updatebatch', id]);
}
}
