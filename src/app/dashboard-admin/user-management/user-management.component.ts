import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {ConnectionService} from '../../service/connection.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  registerform = new FormGroup({});
  constructor(private dataService: ConnectionService) { }
  title = "User Management";
  response:any;
  AllUsers:any = [];
  SearchStudent: string = "";
  p: any; s: any; HideNavigation = true;
  NoAccepted:string = "red"; Accepted:string = "green";
  UserActivationDisable: boolean = false;
  LockSubmit: boolean = false; LoadingStatus: boolean = true;
  ChangeVisibility: boolean = false;
  DefaultClasses: any = [];
  UserClasses:    any = [];
  ngOnInit(): void {
    this.getAllTeachers()
    this. CheckValidations ()

  }
  CheckValidations () {
    this.registerform = new FormGroup({
      id: new FormControl(),
      firstname : new FormControl(null, Validators.required),
      lastname : new FormControl(null, Validators.required),
      phone : new FormControl(null, [Validators.required, Validators.pattern('[0-9]{10}$')]),
      email : new FormControl(null, [Validators.required, Validators.email]),
      password : new FormControl('p@$$GOandCLCt$200'),
      status : new FormControl('1'),
      type : new FormControl('0'),
    })
  }
  getAllTeachers(){
    this.dataService.getData('/get-teachers').subscribe(res => {
      this.response = res;
      this.AllUsers = this.response.data;
      this.UserActivationDisable = false;
      console.log(this.AllUsers)

    })
  }

  Activation(value:boolean, id:number) {
    this.UserActivationDisable = true;
    this.registerform.patchValue({ id: id, status:  value});
    this.dataService.UpdateData('/user/update/activate', id, this.registerform.value).subscribe(response=>{
      this.getAllTeachers();
    })
  }
  ChangeStyle: string = 'color: coral';
  Message: string = "";
  UpdateUserData(){
    this.registerform.patchValue({ password: '', });
    this.LockSubmit = true; this.LoadingStatus = false; this.ChangeVisibility = true;
    this.dataService.UpdateData('/user/update', this.registerform.get('id')?.value, this.registerform.value).subscribe(res => {
      this.response = res;
      //console.log(this.response.error.errorInfo);
      if (this.response.status === 1) {
        this.LockSubmit = false; this.LoadingStatus = true;
        this.getAllTeachers();
        this.ChangeStyle = 'color: green'; this.Message = "Your changes have been successfully saved"; this.ChangeVisibility = false;
        setTimeout(() => {
          this.ChangeVisibility = true;
        }, 2000);
      } else {
        this.LockSubmit = false; this.LoadingStatus = true;
        this.ChangeStyle = 'color: red'; this.Message = "Something went wrong"; this.ChangeVisibility = false;
        setTimeout(() => {
          this.ChangeVisibility = true;
        }, 2000);
      }
    });
  }

  EditUserProfile(value: any) {
    this.registerform.reset();this.LoadingStatus = true;this.ChangeVisibility = true;
    this.registerform.patchValue({
      id: value.id,
      firstname: value.firstname,
      lastname: value.lastname,
      year: value.year,
      school: value.school,
      nic: value.nic,
      phone: value.phone,
      email: value.email,
    });
    this.DefaultClasses = value.clzs;
    this.UserClasses = this.DefaultClasses;
  }
  CreateAccount(){
    this.registerform.patchValue({ status: '1', type: '0'});
    this.LockSubmit = true; this.LoadingStatus = false; this.ChangeVisibility = true;
    this.dataService.PutData('/user/register', this.registerform.value).subscribe(res => {
      this.response = res;
      //console.log(this.response.error.errorInfo);
      console.log(this.response);
      if (this.response.status === 1){
        this.LockSubmit = false; this.LoadingStatus = true;
        this.ChangeStyle = 'color: green'; this.Message = "New account created successfully"; this.ChangeVisibility = false;
        setTimeout(() => {
          this.ChangeVisibility = true;
        }, 2000);
        this.registerform.reset();
      }
      else {
        this.LockSubmit = false; this.LoadingStatus = true;
        this.ChangeStyle = 'color: red'; this.Message = "Email address is already in use"; this.ChangeVisibility = false;
        setTimeout(() => {
          this.ChangeVisibility = true;
        }, 2000);
      }
    });
  }
}
