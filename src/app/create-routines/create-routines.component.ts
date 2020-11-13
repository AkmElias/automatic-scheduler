import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateRoutineapiService } from '../createroutineapi.service';
import { Router } from '@angular/router';
import { CreateCreateRoutineComponent } from '../create-create-routine/create-create-routine.component';
import { UpdateCreateRoutineComponent } from '../update-create-routine/update-create-routine.component';
import { CreateRoutineDetailsComponent } from '../create-routine-details/create-routine-details.component';

@Component({
  selector: 'app-create-routines',
  templateUrl: './create-routines.component.html',
  styleUrls: ['./create-routines.component.css'],
  providers: [CreateRoutineapiService]
})
export class CreateRoutinesComponent {

createRoutines = [{roomCode: ''}];
selectedcreateRoutine;

constructor(private api: CreateRoutineapiService, private router: Router) {

  setTimeout(() => {
    this.getcreateRoutines();
  }, 500);

  this.getcreateRoutines();
  this.selectedcreateRoutine = {createRoutineID: '-1', dpt_code: '',
  fac_shortName: '', batch: '', section: '', roomCode: '', crs_shortName: '',
  cousreCode: '', day: '', duration: ''};
}
getcreateRoutines = () => {
  this.api.getAllCreateRoutines().subscribe(
    data => {
      this.createRoutines = data;
    },
    error => {
      console.log(error);
    }
  );
}
createRoutineClicked = (createRoutine) => {
  this.api.getOneCreateRoutine(createRoutine.createRoutineID).subscribe(
    data => {
      this.selectedcreateRoutine = data;
    },
    error => {
      console.log(error);
    }
  );
}
updatecreateRoutine = () => {
  this.api.updateCreateRoutine(this.selectedcreateRoutine).subscribe(
    data => {
      this.getcreateRoutines();
    },
    error => {
      console.log(error);
    }
  );
}
createcreateRoutine = () => {
  this.api.createCreateRoutine(this.selectedcreateRoutine).subscribe(
    data => {
      this.createRoutines.push(data);
    },
    error => {
      console.log(error);
    }
  );
}
deletecreateRoutine = () => {
  this.api.deleteCreateRoutine(this.selectedcreateRoutine.createRoutineID).subscribe(
    data => {
      this.getcreateRoutines();
    },
    error => {
      console.log(error);
    }
  );
}

CreatecreateRoutine(){
  this.router.navigate(['addcreateRoutine']);
}

createRoutineDetails(createRoutineID){
  this.router.navigate(['createRoutinedetails', createRoutineID]);
}

UpdatecreateRoutine(createRoutineID){
  this.router.navigate(['updatecreateRoutine', createRoutineID]);
}

}
