import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from  '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  authForm: {};
  username: String;
  email: String;
  password: String;
  isSubmitted = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  signUp() {
    this.isSubmitted = true;
    this.authForm = {
      username: this.username,
      email: this.email,
      password: this.password
    }
    console.log('sad: ', this.authForm);
    this.authService.signUpUser(this.authForm).subscribe(data => {
      console.log("user: ",data)
      this.router.navigateByUrl("/login");
    }, error => {
      alert(error)
    })
}
}
