import { Component, OnInit } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from "../auth.service";
import { PasswordResetApiService } from "../passwordresetapi.service";

@Component({
  selector: "app-forgetPassword",
  templateUrl: "./forgetPassword.component.html",
  styleUrls: ["./forgetPassword.component.css"],
})

export class ForgetPassword {

   email: String;
   token: String;
   password: String;

   tokenSend = false;
    constructor(private auth: AuthService, 
        private router: Router, 
        private passwordApi: PasswordResetApiService){

    }

    sendToken(){
       this.passwordApi.sendToken(this.email).subscribe(data => {
           this.tokenSend = true;
           console.log('token: ',data)
       }, error => {
           alert('Email does not exist')
           console.log(error)
       })
    }

    resetPassword() {
        const newPass = {
            token: this.token,
            password: this.password
        };

        this.passwordApi.resetPassword(newPass).subscribe(response => {
            console.log('response: ',response)
            alert('Password reset successfuly')
            this.router.navigateByUrl('/login')
        },error => {
            console.log(error)
        })

    }


}