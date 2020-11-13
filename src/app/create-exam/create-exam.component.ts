import { ExamapiService } from '../examapi.service';
import { Exam } from '../exam';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css'],
  providers: [ExamapiService]
})
export class CreateExamComponent {

  exams = [{exm_type: ''}];
  Exam;

  submitted = false;

  constructor(private examService: ExamapiService, private router: Router)
  {
    this.Exam = { examID: '', exm_type: '', exm_term: '', exm_year: ''};
  }

  createExam = () => {
    this.examService.createExam(this.Exam).subscribe(
      data => {
        this.exams.push(data);
      },
      error => {
        console.log(error);
      }
    );

    this.submitted = false;
    this.gotoList();
  }

    onSubmit() {
    this.submitted = true;
    this.createExam();
  }

  gotoList() {
    this.router.navigate(['/exam']);
  }
}
