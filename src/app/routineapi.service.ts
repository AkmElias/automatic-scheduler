import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { RoutineComponent } from "./routine/routine.component";
@Injectable({
  providedIn: "root",
})
export class RoutineapiService {
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}

  getAllRoutines(): Observable<any> {
    return this.http.get(this.baseurl + "/routines/", {
      headers: this.httpHeaders,
    });
  }
  getRoutinesByTermYearProgram(termYearProgram): Observable<any> {
    console.log("typ.", termYearProgram);
    return this.http.get(this.baseurl + "/routines/" + termYearProgram + "/", {
      headers: this.httpHeaders,
    });
  }
  getOneRoutine(routineID): Observable<any> {
    return this.http.get(this.baseurl + "/routines/" + routineID + "/", {
      headers: this.httpHeaders,
    });
  }
  updateRoutine(routine): Observable<any> {
    const body = {
      routineID: routine.routineID,
      courseOfferedID: routine.courseOfferedID,
      roomCode: routine.roomCde,
      examID: routine.examID,
      timeSlotID: routine.timeSlotID,
    };
    return this.http.put(
      this.baseurl + "/routines/" + routine.routineCode + "/",
      body,
      { headers: this.httpHeaders }
    );
  }
  createRoutine(routine): Observable<any> {
    const body = {
      title: routine.title,
      batchAndSection: routine.batchAndSection,
      timeSlot: routine.timeSlot,
      courseName: routine.course,
      faculty: routine.faculty,
      room: routine.room,
    };
    return this.http.post(this.baseurl + "/routines/", body, {
      headers: this.httpHeaders,
    });
  }
  deleteRoutine(routineID): Observable<any> {
    return this.http.delete(this.baseurl + "/routines/" + routineID + "/", {
      headers: this.httpHeaders,
    });
  }
}
