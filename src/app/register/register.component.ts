import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../service/connection.service';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import  {ConfirmedValidator }  from './CustomValidators';
import {MessageService} from '../service/message.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerform:FormGroup = new FormGroup({});
  IsLoading: boolean  = false;
  Response: any;


  constructor(private dataService: ConnectionService, private router: Router,private FB:FormBuilder,private messageService: MessageService) {
    this.registerform =FB.group({
      firstname : new FormControl(null, Validators.required),
      lastname : new FormControl(null, Validators.required),
      phone : new FormControl(null, [Validators.required, Validators.pattern('[0-9]{10}$')]),
      email : new FormControl(null, [Validators.required, Validators.email]),
      password : new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      confirmPassword : new FormControl(null, Validators.required)
    },{
      validator:ConfirmedValidator('password', 'confirmPassword')
      });
  }


  ngOnInit(): void {

  }

  // * Local Initialization * //
  title = "Login Page";

  getPasswordType = "password"; eye_show = "fa fa-eye field-icon";
  getPasswordType_confirm = "password"; eye_show_confirm = "fa fa-eye field-icon";
  SearchYear: any; BorderColour:any;
  LockSubmit: boolean = false; LoadingStatus: boolean = true;
  submitted: boolean = false;

  // * Local Variables * //
  response:any;
  ClassYears:   any = [];
  show_status = true;

  get f(){
    return this.registerform.controls;
  }

  // * User Authentication - Register Function * //
  CreateAccount() {
    if(!this.registerform.valid) {
      return;
    } else {
      this.IsLoading = true;
      this.dataService.PutData('/user/register', this.registerform.value).subscribe(result => {
        console.log(result)
        this.Response = result;

        if (this.Response.status == 1) {
          this.IsLoading = false;
          this.registerform.reset();
          this.messageService.MiddleMessage('info', 'E-mail Confirmation', 'A verification link has been sent to your account. Please check and confirm your e-mail before login to Etutuion.')
        }else{
          this.IsLoading = false;
          this.ErrorMessage("Registration Failed");
        }
      });
    }
  }

  // * Retrieve Data for Form * //
  GetInformation() {
    this.dataService.getData('/getClassYear').subscribe(result => {
      console.log(result);
      this.ClassYears = result;
    })
  }

  // * Password Visibility [Show/Hide] * //
  ChangeVisibility() {
    if (this.getPasswordType === 'password') {
      this.getPasswordType = 'text';
      this.eye_show = "fa fa-eye-slash field-icon";
    } else {
      this.getPasswordType = 'password';
      this.eye_show = "fa fa-eye field-icon";
    }
  }

  ChangeVisibilityConfirm() {
    if (this.getPasswordType_confirm === 'password') {
      this.getPasswordType_confirm = 'text';
      this.eye_show_confirm = "fa fa-eye-slash field-icon";
    } else {
      this.getPasswordType_confirm = 'password';
      this.eye_show_confirm = "fa fa-eye field-icon";
    }
  }

  ErrorMessage (message: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
    })

    Toast.fire({
      icon: 'error',
      title: message
    })
  }
}



