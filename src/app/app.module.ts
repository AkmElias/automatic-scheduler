import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ConfirmEqualValidatorDirective } from "./shared/confirm-equal-validator.directive";
// import { SelectRequiredValidatorDirective } from  '@angular/core';
// import { EqualValidatorDirective } from './shared/equal.validator.directive';
import { AppRoutingModule } from "./app-routing.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";
// import { MaterialModule } from "./material/material.module";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { NoPageFoundComponent } from "./no-page-found/no-page-found.component";
import { AuthComponent } from "./auth/auth.component";
import { AdminComponent } from "./admin/admin.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { RegisterComponent } from "./register/register.component";
import { HttpClientModule } from "@angular/common/http";
import { UserService } from "./user.service";
import { UserapiService } from "./userapi.service";
import { UserComponent } from "./user/user.component";
import { Observable, from } from "rxjs";
import { ApiService } from "./api.service";
// import { DataService } from './data.service';
import { CdkTableModule } from "@angular/cdk/table";

import { DepartmentComponent } from "./department/department.component";
import { DepartmentapiService } from "./departmentapi.service";
import { ProgramComponent } from "./program/program.component";
import { ProgramapiService } from "./programapi.service";
import { CourseComponent } from "./course/course.component";
import { CourseapiService } from "./courseapi.service";
import { BatchComponent } from "./batch/batch.component";
import { BatchapiService } from "./batchapi.service";
import { SectionapiService } from "./sectionapi.service";
import { FacultyComponent } from "./faculty/faculty.component";
import { FacultyapiService } from "./facultyapi.service";
import { ExamComponent } from "./exam/exam.component";
import { ExamapiService } from "./examapi.service";
import { RoomapiService } from "./roomapi.service";
import { TimeSlotComponent } from "./time-slot/time-slot.component";
import { TimeSlotapiService } from "./time-slotapi.service";
import { RosterComponent } from "./roster/roster.component";
import { RoutineapiService } from "./routineapi.service";
import { RoutineComponent } from "./routine/routine.component";
import { CourseOfferedComponent } from "./course-offered/course-offered.component";
import { CourseOfferedapiService } from "./course-offeredapi.service";
import { CreateRoutinesComponent } from "./create-routines/create-routines.component";
import { CreateRoutineapiService } from "./createroutineapi.service";
import { DialogBoxComponent } from "./dialog-box/dialog-box.component";
import { MatAutocomplete } from "@angular/material/autocomplete";
import { AuthGuard } from "./auth.guard";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Ng2SearchPipeModule } from "ng2-search-filter";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { MainComponent } from "./main/main.component";
import { HeaderComponent } from "./main/header/header.component";
import { RoomComponent } from "./roster/room/room.component";
import { FooterComponent } from "./main//footer/footer.component";
import { MainSidebarComponent } from "./main/main-sidebar/main-sidebar.component";
import { ControlSidebarComponent } from "./main/control-sidebar/control-sidebar.component";

import { CreateUserComponent } from "./create-user/create-user.component";
import { UpdateUserComponent } from "./update-user/update-user.component";
import { UserDetailsComponent } from "./user-details/user-details.component";

import { CreateDepartmentComponent } from "./create-department/create-department.component";
import { DepartmentDetailsComponent } from "./department-details/department-details.component";
import { DepartmentListComponent } from "./department-list/department-list.component";
import { UpdateDepartmentComponent } from "./update-department/update-department.component";

import { User } from "./user";
import { Department } from "./department";
import { Program } from "./program";
import { Course } from "./course";
import { Batch } from "./batch";
import { Faculty } from "./faculty";
import { Room } from "./room";
import { Exam } from "./exam";
import { TimeSlot } from "./time-slot";
import { CourseOffered } from "./course-offered";
import { CreateRoutine } from "./create-routine";
import { Routine } from "./routine";
// import { MyfilterPipe } from './myfilter.pipe.ts';\
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

import { CreateRoutineComponent } from "./create-routine/create-routine.component";
import { UpdateRoutineComponent } from "./update-routine/update-routine.component";
import { RoutineDetailsComponent } from "./routine-details/routine-details.component";

import { CreateCreateRoutineComponent } from "./create-create-routine/create-create-routine.component";
import { UpdateCreateRoutineComponent } from "./update-create-routine/update-create-routine.component";
import { CreateRoutineDetailsComponent } from "./create-routine-details/create-routine-details.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    NoPageFoundComponent,
    AuthComponent,
    AdminComponent,
    LoginComponent,
    SignUpComponent,
    RegisterComponent,
    UserComponent,
    DepartmentComponent,
    ProgramComponent,
    CourseComponent,
    BatchComponent,
    FacultyComponent,
    RosterComponent,
    RoutineComponent,
    TimeSlotComponent,
    CourseOfferedComponent,
    DialogBoxComponent,
    ExamComponent,
    DashboardComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    MainSidebarComponent,
    ControlSidebarComponent,
    RoomComponent,
    // SelectRequiredValidatorDirective,
    ConfirmEqualValidatorDirective,
    DepartmentListComponent,
    CreateDepartmentComponent,
    UpdateDepartmentComponent,
    DepartmentDetailsComponent,
    CreateProgramComponent,
    UpdateProgramComponent,
    ProgramDetailsComponent,
    CreateCourseComponent,
    UpdateCourseComponent,
    CourseDetailsComponent,
    CreateBatchComponent,
    UpdateBatchComponent,
    BatchDetailsComponent,
    CreateFacultyComponent,
    UpdateFacultyComponent,
    FacultyDetailsComponent,
    CreateExamComponent,
    UpdateExamComponent,
    ExamDetailsComponent,
    CreateRoomComponent,
    UpdateRoomComponent,
    RoomDetailsComponent,
    CreateTimeSlotComponent,
    UpdateTimeSlotComponent,
    TimeSlotDetailsComponent,
    CreateCourseOfferedComponent,
    UpdateCourseOfferedComponent,
    CourseOfferedDetailsComponent,
    CreateCreateRoutineComponent,
    CreateCreateRoutineComponent,
    UpdateCreateRoutineComponent,
    CreateRoutineDetailsComponent,
    CreateRoutineComponent,
    UpdateRoutineComponent,
    RoutineDetailsComponent,

    // MyfilterPipe
    // EqualValidatorDirective
  ],
  imports: [
    BrowserModule,
    // MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    CdkTableModule,
    FormsModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSliderModule,
    MatSliderModule,
    MatToolbarModule,
    MatMenuModule,
    NgbModule,
    Ng2SearchPipeModule,
  ],
  entryComponents: [DialogBoxComponent],
  providers: [
    UserService,
    UserapiService,
    ApiService,
    DepartmentapiService,
    ProgramapiService,
    CourseapiService,
    BatchapiService,
    SectionapiService,
    FacultyapiService,
    ExamapiService,
    RoomapiService,
    TimeSlotapiService,
    CourseOfferedapiService,
    CreateRoutineapiService,
    RoutineapiService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
