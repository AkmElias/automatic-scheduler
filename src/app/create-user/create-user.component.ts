import { UserapiService } from '../userapi.service';
import { User } from '../user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers: [UserapiService]
})
export class CreateUserComponent {

  users = [{username: ''}];
  User;

  submitted = false;

  constructor(private userService: UserapiService, private router: Router)
  {
    this.User = {id: '', url: '', username: '', email: '', groups: '', password: ''};
  }

  createUser = () => {
    this.userService.createUser(this.User).subscribe(
      data => {
        this.users.push(data);
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
    this.createUser();
  }

  gotoList() {
    this.router.navigate(['/user']);
  }
}
