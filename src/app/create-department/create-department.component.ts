import { DepartmentapiService } from '../departmentapi.service';
import { Department } from '../models/department';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css'],
  providers: [DepartmentapiService]
})
export class CreateDepartmentComponent {

 departments = [{dpt_name: ''}];
 Department;

 submitted = false;

  constructor(private departmentService: DepartmentapiService, private router: Router)
  {
    this.Department = {DepartmentID: '', dpt_code: '' , dpt_name: '' };
  }

  createDepartment = () => {
    this.departmentService.createDepartment(this.Department).subscribe(
      data => {
        this.departments.push(data);
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
    this.createDepartment();
  }

  gotoList() {
    this.router.navigate(['/department']);
  }
}
