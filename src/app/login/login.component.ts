import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "../user";
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  authForm;
  isSubmitted = false;

  ngOnInit() {}

  get formControls() {
    return this.authForm.controls;
  }

  signIn() {
    this.isSubmitted = true;
    // if (this.authForm.invalid) {
    //   return;
    // }
    this.authService.loginUser(this.authForm).subscribe((response) => {
      console.log("login response..", response);
      //this.authService.signIn(this.authForm);
    });

    this.router.navigateByUrl("/admin");
  }
}
