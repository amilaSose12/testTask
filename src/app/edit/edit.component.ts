import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  currentUser: any;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.currentUser = this.route.snapshot.paramMap.get('input');
  }

  returnBack() {
    this.router.navigate(['']);
  }

}
