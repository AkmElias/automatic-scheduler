import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { Department } from './department';
@Injectable({
  providedIn: 'root'
})
export class ProgramapiService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAllPrograms(): Observable<any>{
  return this.http.get(this.baseurl + '/programs/',
  {headers: this.httpHeaders});
  }

  getAllProgram(DepartmentID): Observable<any>{
    return this.http.get(this.baseurl + '/programs/' + DepartmentID,
    {headers: this.httpHeaders});
    }

  getProgramsByProgramCode(programCode): Observable<any>{
    return this.http.get(this.baseurl + '/program/' + programCode + '/',
    {headers: this.httpHeaders});
   }

  getOneProgram(programCode): Observable<any> {
    return this.http.get(this.baseurl + '/programs/' + programCode + '/',
    {headers: this.httpHeaders});
  }
  updateProgram(program): Observable<any> {
    const body = {programCode: program.programCode , pro_name: program.pro_name,
    pro_shortForm: program.pro_shortForm, DepartmentID: program.DepartmentID, pro_type: program.pro_type};
    return this.http.put(this.baseurl + '/programs/' + program.programCode + '/', body,
    {headers: this.httpHeaders});
  }
  createProgram(program): Observable<any> {
    const body = {programCode: program.programCode , pro_name: program.pro_name,
    pro_shortForm: program.pro_shortForm, DepartmentID: program.DepartmentID, pro_type: program.pro_type};
    return this.http.post(this.baseurl + '/programs/', body,
    {headers: this.httpHeaders});
  }
  deleteProgram(programCode): Observable<any> {
    return this.http.delete(this.baseurl + '/programs/' + programCode + '/',
    {headers: this.httpHeaders});
  }

  getAllDepartments(): Observable<any>{
    return this.http.get(this.baseurl + '/departments/',
    {headers: this.httpHeaders});
    }
  getOneDepartment(DepartmentID): Observable<any> {
      return this.http.get(this.baseurl + '/departments/' + DepartmentID + '/',
      {headers: this.httpHeaders});
    }

  }



    // getProgramByDepartmentID(){
  //   const httpParams = new HttpParams({
  //     fromObject: {
  //       DepartmentID: ['1', '2', '3', '4', '5', '6']
  //     }
  //   });

  //   return this.http.get("http://127.0.0.1:8000/programs/", {params: httpParams});

  // }

  // getProgramsByDepartmentID(): Observable<any>{
  //   let params1 = new HttpParams().set('DepartmentID', "2" );
  //   return this.http.get("http://127.0.0.1:8000/programs/", {params: params1});

  //   }

  // getProgramsByDepartmentID(DepartmentID): Observable<any>{
  //   return this.http.get(this.baseurl + '/programs/' + DepartmentID + '/',
  //   {headers: this.httpHeaders});
  //  }
