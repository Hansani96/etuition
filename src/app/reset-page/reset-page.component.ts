import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { ConnectionService } from '../service/connection.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-reset-page',
  templateUrl: './reset-page.component.html',
  styleUrls: ['./reset-page.component.scss']
})
export class ResetPageComponent implements OnInit {

  resetform = new FormGroup({});

  constructor(private dataService: ConnectionService, private router: ActivatedRoute, private routers: Router) { }

  // * Local Initialization * //
  getPasswordType = "password"; eye_show = "fa fa-eye field-icon";
  getPasswordType_confirm = "password"; eye_show_confirm = "fa fa-eye field-icon";
  LockSubmit: boolean = false; LoadingStatus: boolean = true;
  submitted: boolean = false;
  ErrorMessage: string = ""; show_status: boolean = true; BorderColour:string = "";

  // * Import Class * //
  user = new User();

  // * Local Variables * //
  response:any;
  status:any;
  token:any;

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.user.token = params['token'];
      this.user.email = params['user'];
      console.log(params['user'], params['token']);
    });
    this.CheckValidations();
  }

  // * Check Form Validation
  CheckValidations () {
    this.resetform = new FormGroup({
      'password' : new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      'confirmPassword' : new FormControl(null, Validators.required)
    })
  }

  ResetPassword () {
    this.submitted = true;
    if(!this.resetform.valid) {
      return;
    } else {
      if (this.user.password === this.user.confirmations) {
        this.LockSubmit = true; this.LoadingStatus = false; this.BorderColour = "";
        this.dataService.PutData('/reset-password', this.user).subscribe(res => {
          this.response = res;
          if (this.response.status === 1){
            this.LockSubmit = false; this.LoadingStatus = true;
            this.SweetAlert();
          } else {
            this.LockSubmit = false; this.LoadingStatus = true;
            this.ErrorMessage ="Something went wrong! Try again";
            this.show_status = false;
            setTimeout(() => {
              this.show_status = true;
            }, 2000);
          }
        });
      } else {
        this.BorderColour = '1px solid #BA3633';
        this.LockSubmit = false; this.LoadingStatus = true;
        this.ErrorMessage ="Those passwords didn’t match. Try again!";
        this.show_status = false;
        setTimeout(() => {
          this.show_status = true;
        }, 2000);
      }
    }
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

  // * Float Message [Successful Message!] 
  SweetAlert() {
    Swal.fire({
      title: "Password reset Successfully",
      text: "You can use your new password to login",
      icon: "success",
      showConfirmButton: true,
      confirmButtonText: "Go to login",
      confirmButtonColor: "#FDB415",
    }).then((result) => {
      if (result.isConfirmed) {
        this.routers.navigate(['/login']);
      }
    });
  }
}
