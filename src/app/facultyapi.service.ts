import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class FacultyapiService {
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}

  getAllFaculties(): Observable<any> {
    return this.http.get(this.baseurl + "/faculties/", {
      headers: this.httpHeaders,
    });
  }

  getFacultyByFacultyID(facultyID): Observable<any> {
    return this.http.get(this.baseurl + "/faculties/" + facultyID + "/", {
      headers: this.httpHeaders,
    });
  }

  getOneFaculty(facultyID): Observable<any> {
    return this.http.get(this.baseurl + "/faculties/" + facultyID + "/", {
      headers: this.httpHeaders,
    });
  }
  updateFaculty(faculty): Observable<any> {
    const body = {
      id: faculty.id,
      fac_title: faculty.fac_title,
      fac_firstName: faculty.fac_firstName,
      fac_lastName: faculty.fac_lastName,
      fac_shortName: faculty.fac_shortName,
      fac_gender: faculty.fac_gender,
      fac_designation: faculty.fac_designation,
      DepartmentID: faculty.DepartmentID,
    };
    console.log("faculty", body);
    return this.http.put(
      this.baseurl + "/faculties/" + faculty.id + "/",
      body,
      { headers: this.httpHeaders }
    );
  }
  createFaculty(faculty): Observable<any> {
    const body = {
      fac_title: faculty.fac_title,
      fac_firstName: faculty.fac_firstName,
      fac_lastName: faculty.fac_lastName,
      fac_shortName: faculty.fac_shortName,
      fac_gender: faculty.fac_gender,
      fac_designation: faculty.fac_designation,
      DepartmentID: faculty.DepartmentID,
    };
    return this.http.post(this.baseurl + "/faculties/", body, {
      headers: this.httpHeaders,
    });
  }
  deleteFaculty(facultyID): Observable<any> {
    return this.http.delete(this.baseurl + "/faculties/" + facultyID + "/", {
      headers: this.httpHeaders,
    });
  }
}
