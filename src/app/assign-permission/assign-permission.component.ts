import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestServiceService } from '../test-service.service';

@Component({
  selector: 'app-assign-permission',
  templateUrl: './assign-permission.component.html',
  styleUrls: ['./assign-permission.component.css']
})
export class AssignPermissionComponent implements OnInit {

  userId: any;
  user: any;

  permissions: any;

 isSelected: boolean = false;

  public newPermissionFormGroup: FormGroup;
  public formBuilder: FormBuilder;
  showBox: boolean = false;
  
  constructor(private router: Router, public injector: Injector, private route: ActivatedRoute, private testService: TestServiceService) {

    this.formBuilder = injector.get(FormBuilder);
    this.newPermissionFormGroup = this.formBuilder.group({
      userId: this.formBuilder.control(0, [Validators.required]),
      code: this.formBuilder.control('', [Validators.required])
    });

    this.newPermissionFormGroup.get('code')?.valueChanges.pipe().subscribe((value: any) => {
      this.isSelected = true;
    });

   }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.newPermissionFormGroup.get('userId')?.setValue(this.userId);

    this.testService.getOneUser(this.userId).subscribe(
      (data: any) => {
        this.user = data;
      },
      (err) => {
        console.log(err);
      }
    );
  
    this.testService.getAllPermissionsForUsers().subscribe(
      (data: any) => {
        this.permissions = data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  returnBack() {
    this.router.navigate(['']);
  }

  onSubmit() {
    this.testService.changePermissionForUser(this.newPermissionFormGroup.value).subscribe(
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
