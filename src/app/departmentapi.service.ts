import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable  } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DepartmentapiService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAllDepartments(): Observable<any>{
  return this.http.get(this.baseurl + '/departments/',
  {headers: this.httpHeaders});
  }
  getDepartmentByDepartmentID(DepartmentID): Observable<any> {
    return this.http.get(this.baseurl + '/departments/' + DepartmentID + '/',
    {headers: this.httpHeaders});
  }
  getOneDepartment(DepartmentID): Observable<any> {
    return this.http.get(this.baseurl + '/departments/' + DepartmentID + '/',
    {headers: this.httpHeaders});
  }
  updateDepartment(department): Observable<any> {
    const body = {DepartmentID: department.DepartmentID , dpt_code: department.dpt_code, dpt_name: department.dpt_name };
    return this.http.put(this.baseurl + '/departments/' + department.DepartmentID + '/', body,
    {headers: this.httpHeaders});
  }
  createDepartment(department): Observable<any> {
    const body = {DepartmentID: department.DepartmentID , dpt_code: department.dpt_code, dpt_name: department.dpt_name };
    return this.http.post(this.baseurl + '/departments/', body,
    {headers: this.httpHeaders});
  }
  deleteDepartment(DepartmentID): Observable<any> {
    return this.http.delete(this.baseurl + '/departments/' + DepartmentID + '/',
    {headers: this.httpHeaders});
  }
  }
