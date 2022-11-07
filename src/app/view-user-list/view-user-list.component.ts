import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TestServiceService } from '../test-service.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-view-user-list',
  templateUrl: './view-user-list.component.html',
  styleUrls: ['./view-user-list.component.css']
})
export class ViewUserListComponent implements OnInit {

  public users: any;

  public currentPage: number = 1;
  public search: FormControl = new FormControl();
  public filterFormGroup: FormGroup;
  public formBuilder: FormBuilder;
  public status: FormControl = new FormControl();

  

  constructor(private router: Router, public injector: Injector, private testService: TestServiceService) {

    this.formBuilder = injector.get(FormBuilder);
    this.filterFormGroup = this.formBuilder.group({
      search: this.formBuilder.control(''),
      status: this.formBuilder.control('')
    });

    this.filterFormGroup.valueChanges.pipe(debounceTime(1000)).subscribe((value: any) => {
      this.testService.getFilteredUsers(this.filterFormGroup.value, this.currentPage).subscribe(
        (data: any) => {
          this.users = data;
        },
        (err: any) => {
          console.log(err);
        }
      );
    });
  }



  ngOnInit(): void {
    this.getAllUsers(); 
  }

  getAllUsers() {
    this.testService.getAll(this.currentPage).subscribe(
      (data: any) => {
        this.users = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }


  openUserForm(userId: any) {
    this.router.navigate(['/userForm', {userId: userId}]);
  }

  openAssignPermissions(userId: any) {
    this.router.navigate(['/assignPermissions', {userId: userId}]);
  }


  delete(userId: number) {
      if (confirm("Are you sure you want to delete this user?")) {
        this.testService.deleteCurrentUser(userId).subscribe(
          (data: any) => {
            this.getAllUsers();
          },
          (err) => {
            console.log(err);
          }
        );
      }
  }

  changePage($event: any) {
    if ($event != this.currentPage) {
      this.currentPage = $event;
      this.testService.getFilteredUsers(this.filterFormGroup.value, this.currentPage).subscribe(
        (data: any) => {
          this.users = data;
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }

  // showModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template, {
  //     animated: true,
  //     keyboard: true,
  //     backdrop: true,
  //     ignoreBackdropClick: false
  //   } as ModalOptions);
  // }

  /* doDeleteItem() {
    this.testService.deleteCurrentUser(userId).subscribe(
      (data: any) => {
        this.getAllUsers();
      },
      (err) => {
        console.log(err);
      }
    );
  } */



  
}
