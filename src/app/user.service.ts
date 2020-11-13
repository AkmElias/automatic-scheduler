import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable  } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { User } from './user';

@Injectable()
// @Injectable({
//   providedIn: 'root'
// })
export class UserService {
  // selectedUser: User ={
  //   email: '',
  //   password: ''
  // };

    constructor(private http: HttpClient) { }
    // postUser(user:User)
    // {
    //   return this.http.post(environment.apiUrl+'/SignUpForm',user)
    // }
 // }
    registerUser(userData): Observable<any> {
      return this.http.post('http://127.0.0.1:8000/users/', userData);
    }

    loginUser(userData): Observable<any> {
      return this.http.post('http://127.0.0.1:8000/auth/', userData);
    }

  }
