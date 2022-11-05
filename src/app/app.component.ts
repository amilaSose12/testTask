import {  Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testFe'; 

  constructor(private router: Router) {}

  openEdit() {
    this.router.navigate(['/edit', {input: ''}]);
  }

  openAssignPermissions() {
    this.router.navigate(['/assignPermissions', {input: ''}]);
  }

  openAddNewUser() {
    this.router.navigate(['/addNewUser', {input: ''}]);
  }

  
}
