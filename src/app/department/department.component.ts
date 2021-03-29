import { Component, OnInit } from "@angular/core";
import { DepartmentapiService } from "../departmentapi.service";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-department",
  templateUrl: "./department.component.html",
  styleUrls: ["./department.component.css"],
})
export class DepartmentComponent {
  title = "List of Department";
  searchText;

  departments = [{ id: 1, dpt_name: "test" }];
  selectedDepartment;
  isLoggedIn: boolean;
  constructor(
    private api: DepartmentapiService,
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
    if(!this.isLoggedIn){
      this.router.navigateByUrl('/login');
    }
    this.getDepartments();
    this.selectedDepartment = { id: "-1", dpt_code: "", dpt_name: "test" };
  }

  getDepartments = () => {
    this.api.getAllDepartments().subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.log(error);
      }
    );
  };

  departmentClicked = (department) => {
    this.api.getOneDepartment(department.id).subscribe(
      (data) => {
        this.selectedDepartment = data;
      },
      (error) => {
        console.log(error);
      }
    );
  };
  updateDepartment = () => {
    this.api.updateDepartment(this.selectedDepartment).subscribe(
      (data) => {
        this.getDepartments();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  createDepartment = () => {
    this.api.createDepartment(this.selectedDepartment).subscribe(
      (data) => {
        this.departments.push(data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  deleteDepartment = (DepartmentID) => {
    this.departments = this.departments.filter(
      (department) => department.id !== DepartmentID
    );

    // this.api.deleteDepartment(DepartmentID).subscribe(
    //   (data) => {
    //     this.getDepartments();
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  };

  Createdepartment() {
    this.router.navigate(["adddepartment"]);
  }

  departmentDetails(DepartmentID) {
    this.router.navigate(["departmentdetails", DepartmentID]);
  }

  Updatedepartment(DepartmentID) {
    this.router.navigate(["updatedepartment", DepartmentID]);
  }
}
