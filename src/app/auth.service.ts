import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "./user";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginUser(userData): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/auth/", userData);
  }

  public signIn(userData: User) {
    localStorage.setItem("ACCESS_TOKEN", "access_token");
  }
  public isLoggedIn() {
    return localStorage.getItem("ACCESS_TOKEN") !== null;
  }
  public logout() {
    localStorage.removeItem("ACCESS_TOKEN");
  }
}
