import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './Components/login/login.component';
import {HttpClientModule} from "@angular/common/http";
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { WorkerComponent } from './Components/worker/worker.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AdminComponent } from './Components/admin/admin.component';
import { ScheduleApprovalModalComponent } from './Components/Modals/schedule-approval-modal/schedule-approval-modal.component';




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavBarComponent,
    DashboardComponent,
    WorkerComponent,
    AdminComponent,
    ScheduleApprovalModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
