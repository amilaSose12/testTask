import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-user-list',
  templateUrl: './view-user-list.component.html',
  styleUrls: ['./view-user-list.component.css']
})
export class ViewUserListComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    
  }
  openEdit() {
    this.router.navigate(['/edit', {input: ''}]);
  }

  openAssignPermissions() {
    this.router.navigate(['/assignPermissions', {input: ''}]);
  }

  openAddNewUser() {
    this.router.navigate(['/addNewUser', {input: ''}]);
  }

  delete(parameter: number) {
  
      if (confirm("Are you sure you want to delete this item?")) {
        console.log('MOZE', parameter);
      }
    
  }

  
}
