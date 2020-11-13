import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserapiService } from '../userapi.service';
import { Router } from '@angular/router';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent  {

title = 'List of User';

users = [{username: 'test'}];
selectedUser;

constructor(private api: UserapiService, private router: Router) {
  this.getUsers();
  this.selectedUser = {id: -1, url: '', username: 'test', email: '', groups: '1', password: ''};
}
getUsers = () => {
  this.api.getAllUsers().subscribe(
    data => {
      this.users = data;
    },
    error => {
      console.log(error);
    }
  );
}
userClicked = (user) => {
  this.api.getOneUser(user.id).subscribe(
    data => {
      this.selectedUser = data;
    },
    error => {
      console.log(error);
    }
  );
}
updateUser = () => {
  this.api.updateUser(this.selectedUser).subscribe(
    data => {
      this.getUsers();
    },
    error => {
      console.log(error);
    }
  );
}
createUser = () => {
  this.api.createUser(this.selectedUser).subscribe(
    data => {
      this.users.push(data);
    },
    error => {
      console.log(error);
    }
  );
}
deleteUser = () => {
  this.api.deleteUser(this.selectedUser.id).subscribe(
    data => {
      this.getUsers();
    },
    error => {
      console.log(error);
    }
  );
}

Createuser(){
  this.router.navigate(['adduser']);
}

userDetails(id){
  this.router.navigate(['userdetails', id]);
}

Updateuser(id){
  this.router.navigate(['updateuser', id]);
}
}
