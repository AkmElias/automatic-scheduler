import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable  } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TimeSlotapiService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAllTimeSlots(): Observable<any>{
  return this.http.get(this.baseurl + '/timeSlots/',
  {headers: this.httpHeaders});
  }
  getOneTimeSlot(timeSlotID): Observable<any> {
    return this.http.get(this.baseurl + '/timeSlots/' + timeSlotID + '/',
    {headers: this.httpHeaders});
  }
  updateTimeSlot(timeSlot): Observable<any> {
    const body = {timeSlotID: timeSlot.timeSlotID, tst_day: timeSlot.tst_day,
    tst_duration: timeSlot.tst_duration, tst_type: timeSlot.tst_type};
    return this.http.put(this.baseurl + '/timeSlots/' + timeSlot.timeSlotID + '/', body,
    {headers: this.httpHeaders});
  }
  createTimeSlot(timeSlot): Observable<any> {
    const body = {timeSlotID: timeSlot.timeSlotID, tst_day: timeSlot.tst_day,
      tst_duration: timeSlot.tst_duration, tst_type: timeSlot.tst_type};
    return this.http.post(this.baseurl + '/timeSlots/', body,
    {headers: this.httpHeaders});
  }
  deleteTimeSlot(timeSlotID): Observable<any> {
    return this.http.delete(this.baseurl + '/timeSlots/' + timeSlotID + '/',
    {headers: this.httpHeaders});
  }
  }
