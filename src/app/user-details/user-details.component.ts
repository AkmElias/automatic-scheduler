import { User } from '../user';
import { Component, OnInit, Input } from '@angular/core';
import { UserapiService } from '../userapi.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  providers: [UserapiService]
})
export class UserDetailsComponent implements OnInit {

  id: number;
  user: User;

  constructor(private route: ActivatedRoute,private router: Router, private userService: UserapiService) { }

  ngOnInit() {
    // this.user = new User();

    this.id = this.route.snapshot.params['id'];

    this.userService.getOneUser(this.id)
      .subscribe(data => {
        console.log(data)
        this.user = data;
      }, error => console.log(error));
  }

// list(){
//   this.router.navigate(['userlist']);
// }

Userlist(){
  this.router.navigate(['user']);
}

}
