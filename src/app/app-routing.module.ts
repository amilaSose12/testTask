import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { AppComponent } from './app.component';
import { AssignPermissionComponent } from './assign-permission/assign-permission.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  
  {path: 'edit', component: EditComponent},
  {path: 'assignPermissions', component: AssignPermissionComponent},
  {path: 'addNewUser', component: AddNewUserComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
