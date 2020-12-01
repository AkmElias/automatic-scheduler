import { RoomapiService } from '../roomapi.service';
import { Room } from '../room';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css'],
  providers: [RoomapiService]
})
export class CreateRoomComponent {

  rooms = [{rom_type: '' }];
  Room;

  submitted = false;

  constructor(private roomService: RoomapiService, private router: Router)
  {
    
  }

  createRoom = () => {
    console.log('room..',this.Room)
    this.roomService.createRoom(this.Room).subscribe(
      data => {
        this.rooms.push(data);
      },
      error => {
        console.log(error);
      }
    );

    this.submitted = false;
    this.gotoList();
  }

    onSubmit() {
    this.submitted = true;
    this.createRoom();
  }

  gotoList() {
    this.router.navigate(['/room']);
  }
}
