import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assign-permission',
  templateUrl: './assign-permission.component.html',
  styleUrls: ['./assign-permission.component.css']
})
export class AssignPermissionComponent implements OnInit {

  currentUser: any;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUser = this.route.snapshot.paramMap.get('input');
  }

  returnBack() {
    this.router.navigate(['']);
  }

}
