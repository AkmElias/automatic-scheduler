import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "../user.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
  providers: [UserService],
})
export class RegisterComponent implements OnInit {
  //  register;
  register;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.register = {
      username: "",
      email: "",
      password: "",
      // email: ''
    };
  }

  registerUser() {
    if (
      this.register.username === "" ||
      this.register.password === "" ||
      this.register.email === ""
    ) {
      alert("Required fields missing");
      return;
    }
    this.userService.registerUser(this.register).subscribe(
      (response) => {
        console.log("created user: ", response);
        alert("User " + this.register.username + " has been created ");
      },
      (error) => {
        alert("The user may be created allready or something went wrong!");
        console.log("error", error);
      }
    );
  }

  //  login(){
  //   this.userService.loginUser(this.input).subscribe(
  //     reponse => {
  //       console.log(reponse)
  //       alert('User' + this.input.username + ' logged ')
  //     },
  //     error => console.log('error', error)
  //   );
  //  }
}
