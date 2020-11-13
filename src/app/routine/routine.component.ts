import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoutineapiService } from '../routineapi.service';
import { Router } from '@angular/router';
import { CreateRoutineComponent } from '../create-routine/create-routine.component';
import { UpdateRoutineComponent } from '../update-routine/update-routine.component';
import { RoutineDetailsComponent } from '../routine-details/routine-details.component';


@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css'],
  providers: [RoutineapiService]
})
export class RoutineComponent  {

routines = [{roomCode: ''}];

selectedRoutine;
sectionOne = true;
sectionTwo = false;
sectionThree = false;
one = '';
two = '';
three = '';

constructor(private api: RoutineapiService, private router: Router) {

  setTimeout(() => {
    this.getRoutines();
  }, 500);

  this.getRoutines();
  this.selectedRoutine = {routineID: '-1', courseOfferedID: '', roomCode: '', examID: '', timeSlotID: '' };
}
getRoutines = () => {
  this.api.getAllRoutines().subscribe(
    data => {
      this.routines = data;
    },
    error => {
      console.log(error);
    }
  );
}
routineClicked = (routine) => {
  this.api.getOneRoutine(routine.routineID).subscribe(
    data => {
      this.selectedRoutine = data;
    },
    error => {
      console.log(error);
    }
  );
}
updateRoutine = () => {
  this.api.updateRoutine(this.selectedRoutine).subscribe(
    data => {
      this.getRoutines();
    },
    error => {
      console.log(error);
    }
  );
}
createRoutine = () => {
  this.api.createRoutine(this.selectedRoutine).subscribe(
    data => {
      this.routines.push(data);
    },
    error => {
      console.log(error);
    }
  );
}
deleteRoutine = () => {
  this.api.deleteRoutine(this.selectedRoutine.routineID).subscribe(
    data => {
      this.getRoutines();
    },
    error => {
      console.log(error);
    }
  );
}

stepOne() {
  this.sectionTwo = true;
  this.sectionOne = false;
}

stepTwo() {
  this.sectionThree = true;
  this.sectionOne = true;
  this.sectionTwo = true;
}

stepThree() {
  this.sectionThree = false;
  this.sectionTwo = false;
  this.sectionOne = false;
}


Createroutine(){
  this.router.navigate(['addroutine']);
}

routineDetails(routineID){
  this.router.navigate(['routinedetails', routineID]);
}

Updateroutine(routineID){
  this.router.navigate(['updateroutine', routineID]);
}

}
