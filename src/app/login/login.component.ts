import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  '../user';
import { AuthService } from  '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { }

  authForm: FormGroup;
  isSubmitted  =  false;

//   ngOnInit(): void {
//   }

// }
ngOnInit() {
  this.authForm  =  this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
}

get formControls() { return this.authForm.controls; }

signIn(){
  this.isSubmitted = true;
  if(this.authForm.invalid){
    return;
  }
  this.authService.signIn(this.authForm.value);
  this.router.navigateByUrl('/admin');
};
}
