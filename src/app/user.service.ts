import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User ={
    email: '',
    password: ''
  };

    constructor(private http:HttpClient) { }
    postUser(user:User)
    {
      return this.http.post(environment.apiUrl+'/SignUpForm',user)
    }
  }
