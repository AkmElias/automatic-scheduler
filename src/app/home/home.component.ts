import { Component, OnInit } from '@angular/core';
// import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // providers : [DataService]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
// export class HomeComponent implements OnInit {
//     constructor(private dataService : DataService) {


//     }
//   ngOnInit() {
//   this.dataService.getLocalData().subscribe(data => {
//     console.log("Local Data: ");
//     console.log(data);
//   });

//   this.dataService.getRemoteData().subscribe(data => {
//     console.log("Local Data: ");
//     console.log(data);
//   });
// }
// }
