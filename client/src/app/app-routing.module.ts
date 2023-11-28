import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import {WorkerComponent} from "./Components/worker/worker.component";
import {AdminComponent} from "./Components/admin/admin.component";
import {AdminGuard} from "./Guards/admin.guard";
import {WorkerGuard} from "./Guards/worker.guard";

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'worker', component: WorkerComponent, canActivate: [WorkerGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard],},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private router: Router) {
    console.log(this.router.config);
  }
}
