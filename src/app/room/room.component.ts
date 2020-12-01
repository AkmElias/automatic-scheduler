import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoomapiService } from '../roomapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent  {

  title = 'List of Room';
  searchText;

rooms = [{rom_type: 'test' }];
selectedRoom;

constructor(private api: RoomapiService, private router: Router) {


  this.getRooms();
  this.selectedRoom = { roomCode: '-1', rom_capacity: '', rom_floor: '', rom_type: 'test'};
}
getRooms = () => {
  this.api.getAllRooms().subscribe(
    data => {
      this.rooms = data;
    },
    error => {
      console.log(error);
    }
  );
}


// deleteRoom = () => {
//   this.api.deleteRoom(this.selectedRoom.roomCode).subscribe(
//     data => {
//       this.getRooms();
//     },
//     error => {
//       console.log(error);
//     }
//   );
// }

Createroom(){
  this.router.navigate(['addroom']);
}

roomDetails(roomCode){
  this.router.navigate(['roomdetails', roomCode]);
}

Updateroom(roomCode){
  this.router.navigate(['updateroom', roomCode]);
}

}

