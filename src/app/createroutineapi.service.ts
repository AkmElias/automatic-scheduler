import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { CreateRoutinesComponent } from './create-routines/create-routines.component';
@Injectable({
  providedIn: 'root'
})
export class CreateRoutineapiService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAllCreateRoutines(): Observable<any>{
  return this.http.get(this.baseurl + '/createRoutines/',
  {headers: this.httpHeaders});
  }
  getOneCreateRoutine(createRoutineID): Observable<any> {
    return this.http.get(this.baseurl + '/createRoutines/' + createRoutineID + '/',
    {headers: this.httpHeaders});
  }
  updateCreateRoutine(createRoutine): Observable<any> {
    const body = {createRoutineID: createRoutine.createRoutineID, fac_shortForm: createRoutine.fac_shortForm,
    batch: createRoutine.batch, courseCode: createRoutine.courseCode, crs_shortForm: createRoutine.crs_shortForm,
    roomCode: createRoutine.roomCode, day: createRoutine.day, duration: createRoutine.duration};
    return this.http.put(this.baseurl + '/createRoutines/' + createRoutine.createRoutineCode + '/', body,
    {headers: this.httpHeaders});
  }
  createCreateRoutine(createRoutine): Observable<any> {
    const body ={createRoutineID: createRoutine.createRoutineID, fac_shortForm: createRoutine.fac_shortForm,
      batch: createRoutine.batch, courseCode: createRoutine.courseCode, crs_shortForm: createRoutine.crs_shortForm,
      roomCode: createRoutine.roomCode, day: createRoutine.day, duration: createRoutine.duration};
    return this.http.post(this.baseurl + '/createRoutines/', body,
    {headers: this.httpHeaders});
  }
  deleteCreateRoutine(createRoutineID): Observable<any> {
    return this.http.delete(this.baseurl + '/createRoutines/' + createRoutineID + '/',
    {headers: this.httpHeaders});
  }
  }
