import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PasswordResetApiService {
  baseurl = "http://127.0.0.1:8000/api/";
  httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}

  sendToken(email): Observable<any> {
      const body  = {
          email: email
      }
      return this.http.post(this.baseurl + 'password_reset/', body,{
          headers: this.httpHeaders,
      })
  }

  resetPassword(body){
    return this.http.post(this.baseurl + 'password_reset/confirm/', body,{
        headers: this.httpHeaders,
    })
  }
  
}
