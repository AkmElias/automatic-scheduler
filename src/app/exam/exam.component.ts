import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExamapiService } from '../examapi.service';
import { Router } from '@angular/router';
import { CreateExamComponent } from '../create-exam/create-exam.component';
import { UpdateExamComponent } from '../update-exam/update-exam.component';
import { ExamDetailsComponent } from '../exam-details/exam-details.component';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
  providers: [ExamapiService]
})
export class ExamComponent  {

title = 'List of Exam';

exams = [{exm_type: 'test' }];
selectedExam;

constructor(private api: ExamapiService, private router: Router) {

  setTimeout(() => {
    this.getExams();
  }, 500);

  this.getExams();
  this.selectedExam = { examID: '-1', exm_type: '', exm_term: '', exm_year: '0'};
}
getExams = () => {
  this.api.getAllExams().subscribe(
    data => {
      this.exams = data;
    },
    error => {
      console.log(error);
    }
  );
}
examClicked = (exam) => {
  this.api.getOneExam(exam.examID).subscribe(
    data => {
      this.selectedExam = data;
    },
    error => {
      console.log(error);
    }
  );
}
updateExam = () => {
  this.api.updateExam(this.selectedExam).subscribe(
    data => {
      this.getExams();
    },
    error => {
      console.log(error);
    }
  );
}
createExam = () => {
  this.api.createExam(this.selectedExam).subscribe(
    data => {
      this.exams.push(data);
    },
    error => {
      console.log(error);
    }
  );
}
deleteExam = () => {
  this.api.deleteExam(this.selectedExam.examID).subscribe(
    data => {
      this.getExams();
    },
    error => {
      console.log(error);
    }
  );
}

Createexam(){
  this.router.navigate(['addexam']);
}

examDetails(examID){
  this.router.navigate(['examdetails', examID]);
}

Updateexam(examID){
  this.router.navigate(['updateexam', examID]);
}
}
