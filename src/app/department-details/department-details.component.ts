import { Department } from '../department';
import { Component, OnInit, Input } from '@angular/core';
import { DepartmentapiService } from '../departmentapi.service';
import { DepartmentListComponent } from '../department-list/department-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Program } from '../program';
import { ProgramapiService } from '../programapi.service';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css'],
  providers: [DepartmentapiService]
})
export class DepartmentDetailsComponent implements OnInit {

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

list(){
  this.router.navigate(['departmentlist']);
}

Departmentlist(){
  this.router.navigate(['department']);
}

}
