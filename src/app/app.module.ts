import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssignPermissionComponent } from './assign-permission/assign-permission.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewUserListComponent } from './view-user-list/view-user-list.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AssignPermissionComponent,
    UserFormComponent,
    ViewUserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
