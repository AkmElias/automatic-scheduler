import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
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
  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl("/");
    }
  }

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
        alert("User " + this.register.username + " rsgistered successfully");
        this.router.navigateByUrl("/login");
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
