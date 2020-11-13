import { Routine } from '../routine';
import { Component, OnInit, Input } from '@angular/core';
import { RoutineapiService } from '../routineapi.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-routine-details',
  templateUrl: './routine-details.component.html',
  styleUrls: ['./routine-details.component.css'],
  providers: [RoutineapiService]
})
export class RoutineDetailsComponent implements OnInit {

  id: number;
  routine: Routine;

  constructor(private route: ActivatedRoute,private router: Router, private routineService: RoutineapiService) { }

  ngOnInit() {
    this.routine = new Routine();

    this.id = this.route.snapshot.params['id'];

    this.routineService.getOneRoutine(this.id)
      .subscribe(data => {
        console.log(data)
        this.routine = data;
      }, error => console.log(error));
  }

// list(){
//   this.router.navigate(['routinelist']);
// }

Routinelist(){
  this.router.navigate(['routine']);
}

}
