import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AssignPermissionComponent } from './assign-permission/assign-permission.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ViewUserListComponent } from './view-user-list/view-user-list.component';

const routes: Routes = [
  {path: '', component: ViewUserListComponent},
  
  {path: 'assignPermissions', component: AssignPermissionComponent},
  {path: 'userForm', component: UserFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
