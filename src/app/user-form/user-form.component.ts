import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  public newUserFormGroup: FormGroup;
  public formBuilder: FormBuilder;

  constructor(private router: Router, public injector: Injector) { 

    this.formBuilder = injector.get(FormBuilder);
    this.newUserFormGroup = this.formBuilder.group({
      firstName: this.formBuilder.control('', [Validators.required]),
      lastName: this.formBuilder.control('', [Validators.required]),
      username: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      status: this.formBuilder.control('', [])
    });
  }

  ngOnInit(): void {
  }

  returnBack() {
    this.router.navigate(['']);
  }

  onSubmit() {
    console.log('submit');
  }
}