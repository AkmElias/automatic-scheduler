import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { Department } from './department';

const localUrl = 'assets/data/smartphone.json';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});



  constructor(private http: HttpClient) { }

  // const localUrl = 'assets/data/department.json';

  getDepartment() {
    return this.http.get(localUrl);
  }
  // get LocalData() {
  //   return this.http.get("/assets/data/department.json");
  // }

  // get remoteData() {
  //   return this.http.get(this.baseurl + '/departments/',
  //   {headers: this.httpHeaders});
  //   }

    // getDepartmentById(id: any): Observable<any> {
  //   return this.http.get<Department>(this.baseurl + id).pipe(
  //     retry(3), catchError(this.handleError<Department>('getDepartment')));
  // }
  // getDepartmentByDeaprtmentID(DepartmentID : number) {
  //   return this.departments
  //   .map(departments => {
  //     let fl = departments.filter(dpt => dpt.DepartmentID === DepartmentID);
  //     return (fl.length > 0) ? fl[0] : null;
  //   });
  // }

  getAllDepartments(): Observable<any>{
    return this.http.get(this.baseurl + '/departments/',
    {headers: this.httpHeaders});
    }
  getOneDepartment(DepartmentID): Observable<any> {
    return this.http.get(this.baseurl + '/departments/' + DepartmentID + '/',
    {headers: this.httpHeaders});
  }

  getDepartmentByDepartmentID(DepartmentID): Observable<any> {
    return this.http.get(this.baseurl + '/departments/' + DepartmentID + '/',
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

  getAllCourses(): Observable<any>{
    return this.http.get(this.baseurl + '/courses/',
    {headers: this.httpHeaders});
    }
  getOneCourse(courseCode): Observable<any> {
    return this.http.get(this.baseurl + '/courses/' + courseCode + '/',
    {headers: this.httpHeaders});
  }

  getAllBatches(): Observable<any>{
    return this.http.get(this.baseurl + '/batches/',
    {headers: this.httpHeaders});
  }
  getOneBatch(id): Observable<any> {
    return this.http.get(this.baseurl + '/batches/' + id + '/',
    {headers: this.httpHeaders});
  }

  getAllFaculties(): Observable<any>{
    return this.http.get(this.baseurl + '/faculties/',
    {headers: this.httpHeaders});
  }
  getOneFaculty(facultyID): Observable<any> {
    return this.http.get(this.baseurl + '/faculties/' + facultyID + '/',
    {headers: this.httpHeaders});
  }


 }
