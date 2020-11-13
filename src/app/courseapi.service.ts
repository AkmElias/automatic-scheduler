import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable  } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CourseapiService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<any>{
  return this.http.get(this.baseurl + '/courses/',
  {headers: this.httpHeaders});
  }

  getAllCourse(courseID): Observable<any>{
    return this.http.get(this.baseurl + '/courses/' + courseID + '/',
    {headers: this.httpHeaders});
    }

  getCourseByCourseID(courseID): Observable<any>{
    return this.http.get(this.baseurl + '/course/' + courseID + '/',
    {headers: this.httpHeaders});
  }

  getOneCourse(courseID): Observable<any> {
    return this.http.get(this.baseurl + '/courses/' + courseID + '/',
    {headers: this.httpHeaders});
  }

  updateCourse(course): Observable<any> {
    // const idSegment = course.courseCode.split('%20');
    // const courseId = idSegment[0];
    // console.log(courseId);
    const body = {id: course.courseID , courseCode: course.courseCode, crs_title: course.crs_title, crs_shortName: course.crs_shortName,
      crs_category: course.crs_category, programCode: course.programCode  };
    return this.http.put(this.baseurl + '/courses/' + course.courseID + '/', body,
    {headers: this.httpHeaders});
  }

  createCourse(course): Observable<any> {
    const body = {id: course.courseID , courseCode: course.courseCode, crs_title: course.crs_title, crs_shortName: course.crs_shortName,
      crs_category: course.crs_category, programCode: course.programCode  };
    return this.http.post(this.baseurl + '/courses/', body,
    {headers: this.httpHeaders});
  }

  deleteCourse(courseCode): Observable<any> {
    return this.http.delete(this.baseurl + '/courses/' + courseCode + '/',
    {headers: this.httpHeaders});
  }

  getAllPrograms(): Observable<any>{
    return this.http.get(this.baseurl + '/programs/',
    {headers: this.httpHeaders});
  }

  getOneProgram(programCode): Observable<any> {
    return this.http.get(this.baseurl + '/programs/' + programCode + '/',
    {headers: this.httpHeaders});
  }
  }
