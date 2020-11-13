import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  //  register;
      input;
      constructor(private userService: UserService ) {}

      ngOnInit(){
        this.input = {
          username: '',
          password: ''
          // email: ''
        };
      }
      onRegister(){
        this.userService.registerUser(this.input).subscribe(
          reponse => {
            alert('User' + this.input.username + ' has been created ')
          },
          error => console.log('error', error)
        );
       }

       onLogin(){
        this.userService.loginUser(this.input).subscribe(
          reponse => {
            console.log(reponse)
            alert('User' + this.input.username + ' logged ')
          },
          error => console.log('error', error)
        );
       }
}
