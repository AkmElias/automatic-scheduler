import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable  } from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class UserapiService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any>{
  return this.http.get(this.baseurl + '/users/',
  {headers: this.httpHeaders});
  }
  getOneUser(id): Observable<any> {
    return this.http.get(this.baseurl + '/users/' + id + '/',
    {headers: this.httpHeaders});
  }
  updateUser(user): Observable<any> {
    const body = {url: user.url, username: user.username, email: user.email, groups: user.groups, password: user.password};
    return this.http.put(this.baseurl + '/users/' + user.id + '/', body,
    {headers: this.httpHeaders});
  }
  createUser(user): Observable<any> {
    const body = {url: user.url, username: user.username, email: user.email, groups: user.groups, password: user.password};
    return this.http.post(this.baseurl + '/users/', body,
    {headers: this.httpHeaders});
  }
  deleteUser(id): Observable<any> {
    return this.http.delete(this.baseurl + '/users/' + id + '/',
    {headers: this.httpHeaders});
  }
  }
