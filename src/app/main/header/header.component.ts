import { AuthService } from "./../../auth.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { EventEmitterService } from "src/app/event-emitter.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(
    private authApi: AuthService,
    private router: Router,
    private eventEmitterService: EventEmitterService
  ) {
    this.isLoggedIn = this.authApi.isLoggedIn();
  }

  ngOnInit(): void {
    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.invokeHeaderComponentFunction.subscribe(
        (name: string) => {
          this.checkLog();
        }
      );
    }
  }

  logout = () => {
    if (confirm("Are you sure to logout!")) {
      this.authApi.logout();
      this.isLoggedIn = this.authApi.isLoggedIn();
      this.router.navigateByUrl("/");
    } else {
      return;
    }
  };

  checkLog = () => {
    this.isLoggedIn = this.authApi.isLoggedIn();
    //alert("event emitter works and loggedin chabged");
  };
}
