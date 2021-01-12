import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "./user";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}
  httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  loginUser(userData): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/auth/", userData, {
      headers: this.httpHeaders,
    });
  }

  public signIn(token) {
    localStorage.setItem("ACCESS_TOKEN", token);
  }
  public isLoggedIn() {
    return localStorage.getItem("ACCESS_TOKEN") !== null;
  }
  public logout() {
    localStorage.removeItem("ACCESS_TOKEN");
  }
}
