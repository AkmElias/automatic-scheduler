import { Component, OnInit } from '@angular/core';
import { Exam } from '../exam';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamapiService } from '../examapi.service';

@Component({
  selector: 'app-update-exam',
  templateUrl: './update-exam.component.html',
  styleUrls: ['./update-exam.component.css'],
  providers: [ExamapiService]
})
export class UpdateExamComponent implements OnInit {

  id: number;
  exam: Exam;

  constructor(private route: ActivatedRoute,private router: Router, private examService: ExamapiService){ }


  ngOnInit() {
    this.exam = new Exam();

    this.id = this.route.snapshot.params['id'];

    this.examService.getOneExam(this.id)
      .subscribe(data => {
        console.log(data)
        this.exam = data;
      }, error => console.log(error));
  }

  updateExam() {
    this.examService.updateExam(this.exam)
      .subscribe(data => console.log(data), error => console.log(error));
    this.exam = new Exam();
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(['/exam']);
  }

}
