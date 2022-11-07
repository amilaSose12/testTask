import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestServiceService } from '../test-service.service';

import { User } from '../UserInterface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit {

  public newUserFormGroup: FormGroup;
  public formBuilder: FormBuilder;

  public userStatus = ["active", "inactive"];

  public userId: any;
  public currentUser: any;

  public showBox: boolean = false;

  constructor(private router: Router, public injector: Injector, public route: ActivatedRoute, private testService: TestServiceService) { 

    this.formBuilder = injector.get(FormBuilder);
    this.newUserFormGroup = this.formBuilder.group({
      id: this.formBuilder.control(0, [Validators.required]),
      firstName: this.formBuilder.control('', [Validators.required]),
      lastName: this.formBuilder.control('', [Validators.required]),
      username: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      status: this.formBuilder.control('', [])
    });
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));

    if(this.userId) {
      this.testService.getOneUser(this.userId).subscribe(
        (data: any) => {
          this.newUserFormGroup.setValue(
            { 
              id: data.id,
              firstName: data.firstName,
              lastName: data.lastName,
              username: data.username,
              password: data.password,
              email: data.email, 
              status: data.status
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  returnBack() {
    this.router.navigate(['']);
  }

  onSubmit() {
    if(this.userId) {
      this.testService.updateUser(this.newUserFormGroup.value).subscribe(
        (data: any) => {
          this.showBox = true;
        setTimeout(() => {
          this.showBox = false;
        }, 2000);

        setTimeout(() => {
          this.returnBack();
        }, 2000);
        },
        (err) => {
          console.log(err);
        }
      );

    } else {
      this.testService.createNewUser(this.newUserFormGroup.value).subscribe(
        (data: any) => {
          this.showBox = true;
        setTimeout(() => {
          this.showBox = false;
        }, 2000);

        setTimeout(() => {
          this.returnBack();
        }, 2000);
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
    
  }
}