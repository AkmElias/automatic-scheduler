import { DepartmentDetailsComponent } from '../department-details/department-details.component';
import { UpdateDepartmentComponent } from '../update-department/update-department.component';
import { Observable } from 'rxjs';
import { DepartmentapiService } from '../departmentapi.service';
import { Department } from '../department';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
  providers: [DepartmentapiService]
})
export class DepartmentListComponent implements OnInit {
  departments: Observable<Department[]>;

  selectedDepartment;

  constructor(private departmentService: DepartmentapiService, private router: Router)

  {
    this.selectedDepartment = {DepartmentID: '-1', dpt_code: '' , dpt_name: 'test' };
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.departments = this.departmentService.getAllDepartments();
  }

  deleteDepartment(DepartmentID) {
    this.departmentService.deleteDepartment(DepartmentID)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  departmentDetails(DepartmentID){
    this.router.navigate(['departmentdetails', DepartmentID]);
  }


  Updatedepartment(DepartmentID){
    this.router.navigate(['updatedepartment', DepartmentID]);
  }
}
