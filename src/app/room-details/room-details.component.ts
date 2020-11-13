import { Room } from '../room';
import { Component, OnInit, Input } from '@angular/core';
import { RoomapiService } from '../roomapi.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css'],
  providers: [RoomapiService]
})
export class RoomDetailsComponent implements OnInit {

  id: number;
  room: Room;

  constructor(private route: ActivatedRoute,private router: Router, private roomService: RoomapiService) { }

  ngOnInit() {
    this.room = new Room();

    this.id = this.route.snapshot.params['id'];

    this.roomService.getOneRoom(this.id)
      .subscribe(data => {
        console.log(data)
        this.room = data;
      }, error => console.log(error));
  }

// list(){
//   this.router.navigate(['roomlist']);
// }

Roomlist(){
  this.router.navigate(['room']);
}

}
