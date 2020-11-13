import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable  } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExamapiService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAllExams(): Observable<any>{
  return this.http.get(this.baseurl + '/exams/',
  {headers: this.httpHeaders});
  }
  getOneExam(examID): Observable<any> {
    return this.http.get(this.baseurl + '/exams/' + examID + '/',
    {headers: this.httpHeaders});
  }
  updateExam(exam): Observable<any> {
    const body = {examID: exam.examID, exm_type: exam.exm_type,
    exm_term: exam.exm_term, exm_year: exam.exm_year};
    return this.http.put(this.baseurl + '/exams/' + exam.examID + '/', body,
    {headers: this.httpHeaders});
  }
  createExam(exam): Observable<any> {
    const body = {examID: exam.examID, exm_type: exam.exm_type,
    exm_term: exam.exm_term, exm_year: exam.exm_year};
    return this.http.post(this.baseurl + '/exams/', body,
    {headers: this.httpHeaders});
  }
  deleteExam(examID): Observable<any> {
    return this.http.delete(this.baseurl + '/exams/' + examID + '/',
    {headers: this.httpHeaders});
  }
  }
