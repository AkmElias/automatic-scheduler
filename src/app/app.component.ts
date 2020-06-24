import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'automatic-scheduler';
 url: string = 'http://127.0.0.1:8000/routine/';

constructor(private http: HttpClient) {}
public getRoutine() {
this.http.get(this.url).toPromise().then((data) => {
console.log(data);
});
}
}
