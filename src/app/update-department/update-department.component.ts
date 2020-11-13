import { Component, OnInit } from '@angular/core';
import { Department } from '../department';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentapiService } from '../departmentapi.service';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css'],
  providers: [DepartmentapiService]
})
export class UpdateDepartmentComponent implements OnInit {

id: number;
department: Department;

  constructor(private route: ActivatedRoute,private router: Router, private departmentService: DepartmentapiService) { }


  ngOnInit() {
    this.department = new Department();

    this.id = this.route.snapshot.params['id'];

    this.departmentService.getOneDepartment(this.id)
      .subscribe(data => {
        console.log(data)
        this.department = data;
      }, error => console.log(error));
  }

  updateDepartment() {
    this.departmentService.updateDepartment(this.department)
      .subscribe(data => console.log(data), error => console.log(error));
    this.department = new Department();
    this.gotoList();
  }


  gotoList() {
    this.router.navigate(['/department']);
  }


}
