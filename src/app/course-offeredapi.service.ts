import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class CourseOfferedapiService {
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}

  getAllCoursesOffered(): Observable<any> {
    return this.http.get(this.baseurl + "/coursesOffered/", {
      headers: this.httpHeaders,
    });
  }

  getCourseOfferedByCourseOfferedID(courseOfferedID): Observable<any> {
    return this.http.get(
      this.baseurl + "/courseOffered/" + courseOfferedID + "/",
      { headers: this.httpHeaders }
    );
  }

  getOneCourseOffered(CoursesOfferedID): Observable<any> {
    return this.http.get(
      this.baseurl + "/coursesOffered/" + CoursesOfferedID + "/",
      { headers: this.httpHeaders }
    );
  }
  updateCourseOffered(coursesOffered) {
    const body = {
      id: coursesOffered.id,
      ofr_term: coursesOffered.ofr_term,
      ofr_year: coursesOffered.ofr_year,
      courseID: coursesOffered.course,
      programCode: coursesOffered.program,
      batchName: coursesOffered.batch,
      sectionName: coursesOffered.section,
      facultyID: coursesOffered.faculty,
    };
    console.log("updated...", body);
    return this.http.put(
      this.baseurl + "/coursesOffered/" + body.id + "/",
      body,
      { headers: this.httpHeaders }
    );
  }
  createCourseOffered(coursesOffered): Observable<any> {
    const body = {
      ofr_term: coursesOffered.term,
      ofr_year: coursesOffered.year,
      courseID: coursesOffered.course,
      programCode: coursesOffered.program,
      batchName: coursesOffered.batch,
      sectionName: coursesOffered.section,
      facultyID: coursesOffered.faculty,
    };
    return this.http.post(this.baseurl + "/coursesOffered/", body, {
      headers: this.httpHeaders,
    });
  }
  deleteCourseOffered(CoursesOfferedID): Observable<any> {
    return this.http.delete(
      this.baseurl + "/coursesOffered/" + CoursesOfferedID + "/",
      { headers: this.httpHeaders }
    );
  }
}
