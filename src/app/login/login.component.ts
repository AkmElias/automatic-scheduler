import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "../user";
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";
import { EventEmitterService } from "../event-emitter.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  authForm: {};
  username: String;
  password: String;
  isSubmitted = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private eventEmitterService: EventEmitterService,
    private formBuilder: FormBuilder
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl("/");
    }
    this.username = "";
    this.password = "";
  }

  ngOnInit() {}

  // get formControls() {
  //   return this.authForm.controls;
  // }

  signIn() {
    this.isSubmitted = true;
    this.authForm = {
      username: this.username,
      password: this.password,
    };

    // if (this.authForm.invalid) {
    //   return;
    // }
    console.log("authForm: ", this.authForm);
    this.authService.loginUser(this.authForm).subscribe(
      (response) => {
        console.log("login response..", response);
        this.authService.signIn(response);
        this.headerComponentFunction();
        this.router.navigateByUrl("/");
      },
      (error) => {
        alert("Username or Password may be wrong!");
      }
    );
  }

  navigateToForget() {
    this.router.navigateByUrl('/forget-password')
  }

  headerComponentFunction() {
    this.eventEmitterService.checkLog();
  }
}
