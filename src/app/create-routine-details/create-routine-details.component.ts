import { CreateRoutine } from '../create-routine';
import { Component, OnInit, Input } from '@angular/core';
import { CreateRoutineapiService } from '../createroutineapi.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-routine-details',
  templateUrl: './create-routine-details.component.html',
  styleUrls: ['./create-routine-details.component.css'],
  providers: [CreateRoutineapiService]
})
export class CreateRoutineDetailsComponent implements OnInit {

  id: number;
  createRoutine: CreateRoutine;

  constructor(private route: ActivatedRoute,private router: Router, private createRoutineService: CreateRoutineapiService) { }

  ngOnInit() {
    this.createRoutine = new CreateRoutine();

    this.id = this.route.snapshot.params['id'];

    this.createRoutineService.getOneCreateRoutine(this.id)
      .subscribe(data => {
        console.log(data)
        this.createRoutine = data;
      }, error => console.log(error));
  }

// list(){
//   this.router.navigate(['routinelist']);
// }

CreateRoutinelist(){
  this.router.navigate(['createRoutine']);
}

}
