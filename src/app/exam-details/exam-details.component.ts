import { Exam } from '../exam';
import { Component, OnInit, Input } from '@angular/core';
import { ExamapiService } from '../examapi.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.css'],
  providers: [ExamapiService]
})
export class ExamDetailsComponent implements OnInit {

  id: number;
  exam: Exam;

  constructor(private route: ActivatedRoute,private router: Router, private examService: ExamapiService) { }

  ngOnInit() {
    this.exam = new Exam();

    this.id = this.route.snapshot.params['id'];

    this.examService.getOneExam(this.id)
      .subscribe(data => {
        console.log(data)
        this.exam = data;
      }, error => console.log(error));
  }

// list(){
//   this.router.navigate(['examlist']);
// }

Examlist(){
  this.router.navigate(['exam']);
}

}
