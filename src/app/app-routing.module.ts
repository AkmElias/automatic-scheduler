import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { NoPageFoundComponent } from "./no-page-found/no-page-found.component";
import { DepartmentComponent } from "./department/department.component";
import { ProgramComponent } from "./program/program.component";
import { CourseComponent } from "./course/course.component";
import { BatchComponent } from "./batch/batch.component";
import { FacultyComponent } from "./faculty/faculty.component";
import { ExamComponent } from "./exam/exam.component";
import { TimeSlotComponent } from "./time-slot/time-slot.component";
import { RosterComponent } from "./roster/roster.component";
import { CourseOfferedComponent } from "./course-offered/course-offered.component";
import { CreateRoutinesComponent } from "./create-routines/create-routines.component";
import { RoutineComponent } from "./routine/routine.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { LoginComponent } from "./login/login.component";
import { UserComponent } from "./user/user.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { RegisterComponent } from "./register/register.component";
import { AuthComponent } from "./auth/auth.component";
import { AdminComponent } from "./admin/admin.component";
import { AuthGuard } from "./auth.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MainComponent } from "./main/main.component";

import { CreateUserComponent } from "./create-user/create-user.component";
import { UpdateUserComponent } from "./update-user/update-user.component";
import { UserDetailsComponent } from "./user-details/user-details.component";

import { CreateDepartmentComponent } from "./create-department/create-department.component";
import { UpdateDepartmentComponent } from "./update-department/update-department.component";
import { DepartmentDetailsComponent } from "./department-details/department-details.component";
import { DepartmentListComponent } from "./department-list/department-list.component";

import { CreateProgramComponent } from "./create-program/create-program.component";
import { UpdateProgramComponent } from "./update-program/update-program.component";
import { ProgramDetailsComponent } from "./program-details/program-details.component";

import { CreateCourseComponent } from "./create-course/create-course.component";
import { UpdateCourseComponent } from "./update-course/update-course.component";
import { CourseDetailsComponent } from "./course-details/course-details.component";

import { CreateBatchComponent } from "./create-batch/create-batch.component";
import { UpdateBatchComponent } from "./update-batch/update-batch.component";
import { BatchDetailsComponent } from "./batch-details/batch-details.component";

import { CreateFacultyComponent } from "./create-faculty/create-faculty.component";
import { UpdateFacultyComponent } from "./update-faculty/update-faculty.component";
import { FacultyDetailsComponent } from "./faculty-details/faculty-details.component";

import { CreateExamComponent } from "./create-exam/create-exam.component";
import { UpdateExamComponent } from "./update-exam/update-exam.component";
import { ExamDetailsComponent } from "./exam-details/exam-details.component";

import { CreateRoomComponent } from "./create-room/create-room.component";
import { UpdateRoomComponent } from "./update-room/update-room.component";
import { RoomDetailsComponent } from "./room-details/room-details.component";

import { CreateTimeSlotComponent } from "./create-time-slot/create-time-slot.component";
import { UpdateTimeSlotComponent } from "./update-time-slot/update-time-slot.component";
import { TimeSlotDetailsComponent } from "./time-slot-details/time-slot-details.component";

import { CreateCourseOfferedComponent } from "./create-course-offered/create-course-offered.component";
import { UpdateCourseOfferedComponent } from "./update-course-offered/update-course-offered.component";
import { CourseOfferedDetailsComponent } from "./course-offered-details/course-offered-details.component";

import { CreateCreateRoutineComponent } from "./create-create-routine/create-create-routine.component";
import { UpdateCreateRoutineComponent } from "./update-create-routine/update-create-routine.component";
import { CreateRoutineDetailsComponent } from "./create-routine-details/create-routine-details.component";

import { CreateRoutineComponent } from "./create-routine/create-routine.component";
import { UpdateRoutineComponent } from "./update-routine/update-routine.component";
import { RoutineDetailsComponent } from "./routine-details/routine-details.component";

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: "login", component: LoginComponent },
  { path: "user", component: UserComponent },
  { path: "signup", component: SignUpComponent },
  { path: "register", component: RegisterComponent },
  { path: "auth", component: AuthComponent },
  { path: "admin", component: AdminComponent, canActivate: [AuthGuard] },
  { path: "navbar", component: NavbarComponent },
  { path: "dashboard", component: DashboardComponent },
  {
    path: "department",
    component: DepartmentComponent,
    canActivate: [AuthGuard],
  },
  { path: "program", component: ProgramComponent, canActivate: [AuthGuard] },
  { path: "course", component: CourseComponent, canActivate: [AuthGuard] },
  { path: "batch", component: BatchComponent, canActivate: [AuthGuard] },
  { path: "faculty", component: FacultyComponent, canActivate: [AuthGuard] },
  { path: "exam", component: ExamComponent },
  { path: "roster", component: RosterComponent },
  { path: "timeSlot", component: TimeSlotComponent },
  { path: "courseOffered", component: CourseOfferedComponent },
  { path: "createRoutine", component: CreateRoutinesComponent },
  { path: "routine", component: RoutineComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  // { path: '**', component: NoPageFoundComponent },

  { path: "adduser", component: CreateUserComponent },
  { path: "updateuser/:id", component: UpdateUserComponent },
  { path: "userdetails/:id", component: UserDetailsComponent },

  { path: "departmentlist", component: DepartmentListComponent },
  { path: "adddepartment", component: CreateDepartmentComponent },
  { path: "updatedepartment/:id", component: UpdateDepartmentComponent },
  { path: "departmentdetails/:id", component: DepartmentDetailsComponent },

  { path: "addprogram", component: CreateProgramComponent },
  { path: "updateprogram/:id", component: UpdateProgramComponent },
  { path: "programdetails/:id", component: ProgramDetailsComponent },

  { path: "addcourse", component: CreateCourseComponent },
  { path: "updatecourse/:id", component: UpdateCourseComponent },
  { path: "coursedetails/:id", component: CourseDetailsComponent },

  { path: "addbatch", component: CreateBatchComponent },
  { path: "updatebatch/:id", component: UpdateBatchComponent },
  { path: "batchdetails/:id", component: BatchDetailsComponent },

  { path: "addfaculty", component: CreateFacultyComponent },
  { path: "updatefaculty/:id", component: UpdateFacultyComponent },
  { path: "facultydetails/:id", component: FacultyDetailsComponent },

  { path: "addexam", component: CreateExamComponent },
  { path: "updateexam/:id", component: UpdateExamComponent },
  { path: "examdetails/:id", component: ExamDetailsComponent },

  { path: "addroom", component: CreateRoomComponent },
  { path: "updateroom/:id", component: UpdateRoomComponent },
  { path: "roomdetails/:id", component: RoomDetailsComponent },

  { path: "addtimeSlot", component: CreateTimeSlotComponent },
  { path: "updatetimeSlot/:id", component: UpdateTimeSlotComponent },
  { path: "timeSlotdetails/:id", component: TimeSlotDetailsComponent },

  { path: "addcourseOffered", component: CreateCourseOfferedComponent },
  {
    path: "updatecourseOffered/:id/:course",
    component: UpdateCourseOfferedComponent,
  },
  {
    path: "courseOffereddetails/:id",
    component: CourseOfferedDetailsComponent,
  },

  { path: "addroutine", component: CreateRoutineComponent },
  { path: "updateroutine/:id", component: UpdateRoutineComponent },
  { path: "routinedetails/:id", component: RoutineDetailsComponent },

  { path: "addcreateRoutine", component: CreateCreateRoutineComponent },
  { path: "updatecreateRoutine/:id", component: UpdateCreateRoutineComponent },
  {
    path: "createRoutinedetails/:id",
    component: CreateRoutineDetailsComponent,
  },

  {
    path: "program/:id",
    component: ProgramComponent,
    data: { title: "Program" },
  },
  { path: "course/:id", component: CourseComponent, data: { title: "Course" } },
  { path: "batch/:id", component: BatchComponent, data: { title: "Batch" } },
  {
    path: "faculty/:id",
    component: FacultyComponent,
    data: { title: "Faculty" },
  },
  {
    path: "courseOffered/:id",
    component: CourseOfferedComponent,
    data: { title: "CourseOffered" },
  },
  {
    path: "routine/:id",
    component: RoutineComponent,
    data: { title: "Routine" },
  },

  // ];

  // const routes: Routes = [

  // { path: 'main', component: MainComponent },
  // { path: '', pathMatch: 'full', redirectTo: 'login'},
  // { path: 'login', component: LoginComponent },
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'header', component: HeaderComponent },
  // { path: 'footer', component: FooterComponent },
  // { path: 'user', component: UserComponent },
  // { path: 'signup', component: SignUpComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'auth', component: AuthComponent },
  // { path: 'admin', component: AdminComponent },
  // { path: 'about', component: AboutComponent },
  // { path: 'contact', component: ContactComponent },
  // { path: 'navbar', component: NavbarComponent },
  // { path: 'department', component: DepartmentComponent },
  // { path: 'program', component: ProgramComponent },
  // { path: 'faculty', component: FacultyComponent },
  // { path: 'batch', component: BatchComponent} ,
  {
    path: "",
    component: MainComponent,
    children: [
      // { path: 'dashboard', component: DashboardComponent },
      { path: "home", component: HomeComponent },
      { path: "about", component: AboutComponent },
      { path: "contact", component: ContactComponent },
      { path: "**", component: NoPageFoundComponent },
      { path: "department", component: DepartmentComponent },
      { path: "program", component: ProgramComponent },
      { path: "course", component: CourseComponent },
      { path: "batch", component: BatchComponent },
      { path: "faculty", component: FacultyComponent },
      { path: "exam", component: ExamComponent },
      { path: "roster", component: RosterComponent },
      { path: "timeSlot", component: TimeSlotComponent },
      { path: "courseOffered", component: CourseOfferedComponent },
      { path: "routine", component: RoutineComponent },
      { path: "home", component: HomeComponent },
      { path: "about", component: AboutComponent },
      { path: "contact", component: ContactComponent },
      { path: "**", component: NoPageFoundComponent },
      { path: "departmentlist", component: DepartmentListComponent },
      { path: "add", component: CreateDepartmentComponent },
      { path: "update/:id", component: UpdateDepartmentComponent },
      { path: "details/<int:pk>", component: DepartmentDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { AboutComponent } from './about/about.component';
// import { ContactComponent } from './contact/contact.component';
// //import { LayoutComponent } from './layout/layout.component';
// import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
// import { DepartmentComponent } from './department/department.component';
// import { ProgramComponent } from './program/program.component';
// import { CourseComponent } from './course/course.component';
// import { BatchComponent } from './batch/batch.component';
// import { FacultyComponent } from './faculty/faculty.component';
// import { ExamComponent } from './exam/exam.component';
// import { RoomComponent } from './room/room.component';
// // import { TimeslotComponent } from './timeslot/timeslot.component';
// import { TimeSlotComponent } from './time-slot/time-slot.component';
// import { RosterComponent } from './roster/roster.component';
// // import { CourseofferedComponent } from './courseoffered/courseoffered.component';
// import { CourseOfferedComponent } from './course-offered/course-offered.component';
// import { RoutineComponent } from './routine/routine.component';
// import { NavbarComponent } from './navbar/navbar.component';
// import { LoginComponent } from './login/login.component';
// import { UserComponent } from './user/user.component';
// import { SignUpComponent } from './sign-up/sign-up.component';
// import { RegisterComponent } from './register/register.component';
// import { AuthComponent } from './auth/auth.component';
// import { AdminComponent } from './admin/admin.component';
// import { AuthGuard } from './auth.guard';
// import { DashboardComponent } from './dashboard/dashboard.component';

// const routes: Routes = [

//   { path: '', pathMatch: 'full', redirectTo: 'login'},
//   { path: 'login', component: LoginComponent },
//   { path: 'user', component: UserComponent },
//   { path: 'signup', component: SignUpComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'auth', component: AuthComponent },
//   { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
//   { path: 'navbar', component: NavbarComponent },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'department', component: DepartmentComponent, canActivate: [AuthGuard] },
//   { path: 'program', component: ProgramComponent, canActivate: [AuthGuard] },
//   { path: 'course', component: CourseComponent, canActivate: [AuthGuard] },
//   { path: 'batch', component: BatchComponent, canActivate: [AuthGuard] },
//   { path: 'faculty', component: FacultyComponent, canActivate: [AuthGuard] },
//   { path: 'exam', component: ExamComponent },
//   { path: 'room', component: RoomComponent },
//   { path: 'roster', component: RosterComponent },
//   { path: 'timeSlot', component: TimeSlotComponent },
//   { path: 'courseOffered', component: CourseOfferedComponent },
//   { path: 'routine', component: RoutineComponent },
//   // { path: 'home', component: LayoutComponent },
//   // { path: 'about', component: LayoutComponent },
//   // { path: 'contact', component: LayoutComponent },

//   { path: '', redirectTo: '/home', pathMatch: 'full' },
//   { path: 'home', component: HomeComponent },
//   { path: 'about', component: AboutComponent },
//   { path: 'contact', component: ContactComponent },
//   { path: '**', component: NoPageFoundComponent },

// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
