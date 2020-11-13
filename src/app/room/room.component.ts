import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoomapiService } from '../roomapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [RoomapiService]
})
export class RoomComponent  {

  title = 'List of Room';
  searchText;

rooms = [{rom_type: 'test' }];
selectedRoom;

constructor(private api: RoomapiService, private router: Router) {

  setTimeout(() => {
    this.getRooms();
  }, 500);

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
roomClicked = (room) => {
  this.api.getOneRoom(room.roomCode).subscribe(
    data => {
      this.selectedRoom = data;
    },
    error => {
      console.log(error);
    }
  );
}
updateRoom = () => {
  this.api.updateRoom(this.selectedRoom).subscribe(
    data => {
      this.getRooms();
    },
    error => {
      console.log(error);
    }
  );
}
createRoom = () => {
  this.api.createRoom(this.selectedRoom).subscribe(
    data => {
      this.rooms.push(data);
    },
    error => {
      console.log(error);
    }
  );
}
deleteRoom = () => {
  this.api.deleteRoom(this.selectedRoom.roomCode).subscribe(
    data => {
      this.getRooms();
    },
    error => {
      console.log(error);
    }
  );
}

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

// import { Component, ViewChild } from '@angular/core';

// import { MatDialog   } from '@angular/material/dialog';
// import {  MatTable } from '@angular/material/table';
// import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

// export interface UsersData {
//   rom_capacity: number;
//   // name: string;
//   // id: number;
//   roomCode: string;
// }

// const ELEMENT_DATA: UsersData[] = [
//   // {id: 1560608769632, name: 'Artificial Intelligence'},
//   {roomCode: 'GCL', rom_capacity: 44},
//   {roomCode: 'GCL', rom_capacity: 45},
//   {roomCode: 'GCL', rom_capacity: 46},

// ];
// @Component({
//   selector: 'app-room',
//   templateUrl: './room.component.html',
//   styleUrls: ['./room.component.css']
// })
// export class RoomComponent {
//   displayedColumns: string[] = ['roomCode', 'rom_capacity', 'action'];
//   dataSource = ELEMENT_DATA;

//   @ViewChild(MatTable,{static:true}) table: MatTable<any>;

//   constructor(public dialog: MatDialog) {}

//   openDialog(action,obj) {
//     obj.action = action;
//     const dialogRef = this.dialog.open(DialogBoxComponent, {
//       width: '250px',
//       data:obj
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if(result.event == 'Add'){
//         this.addRowData(result.data);
//       }else if(result.event == 'Update'){
//         this.updateRowData(result.data);
//       }else if(result.event == 'Delete'){
//         this.deleteRowData(result.data);
//       }
//     });
//   }

//   addRowData(row_obj){
//     var d = new Date();
//     this.dataSource.push({
//       rom_capacity:d.getTime(),
//       roomCode:row_obj.roomCode
//     });
//     this.table.renderRows();

//   }
//   updateRowData(row_obj){
//     this.dataSource = this.dataSource.filter((value,key)=>{
//       if(value.roomCode == row_obj.roomCode){
//         value.rom_capacity = row_obj.rom_capacity;
//       }
//       return true;
//     });
//   }
//   deleteRowData(row_obj){
//     this.dataSource = this.dataSource.filter((value,key)=>{
//       return value.roomCode != row_obj.roomCode;
//     });
//   }


// }
