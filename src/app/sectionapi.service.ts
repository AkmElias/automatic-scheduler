import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class SectionapiService {
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}

  getAllSections(): Observable<any> {
    return this.http.get(this.baseurl + "/sections/", {
      headers: this.httpHeaders,
    });
  }
  getSectionsByBatch(batch): Observable<any> {
    return this.http.get(this.baseurl + "/sections/bt" + batch + "/", {
      headers: this.httpHeaders,
    });
  }
  getOneSection(sectionID): Observable<any> {
    return this.http.get(this.baseurl + "/sections/st" + sectionID + "/", {
      headers: this.httpHeaders,
    });
  }
}
