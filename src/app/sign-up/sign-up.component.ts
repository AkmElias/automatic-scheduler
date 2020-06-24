import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }
  signup(form) {
    console.log(form.value);
}
}
