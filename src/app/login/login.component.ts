import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../service/connection.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router, private auth: AuthService) { }
  loginform = new FormGroup({});
  IsLoading: boolean  = false;

  ngOnInit(): void {
    this.CheckValidations ();
    if (this.token) {
      if(this.type === '1') {
        this.router.navigate(['/administration/home']);
      }else {
        this.router.navigate(['/user/home']); //
      }
    }
  }
  // * Local Initialization
  getPasswordType = "password"; eye_show = "fa fa-eye field-icon";
  //ErrorMessage = "";
  LockSubmit: boolean = false; LoadingStatus: boolean = true;
  submitted: boolean = false;

  // * Local Variables
  response:any;
  show_status = true;
  token = localStorage.getItem('token');
  type = localStorage.getItem('type');

  CheckValidations () {
    this.loginform = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, [Validators.required])
    })
  }

  // * User Authentication - Login Function
  LoginAccount() {
    if (!this.token) {
      this.submitted = true;
      if(!this.loginform.valid) {
        return;
      } else {
        this.IsLoading = true;
        this.auth.Login(this.loginform.value).subscribe(response => {
          this.response = response;
          console.log(response)
          if(response.status) {
            if(response.data.type) {
              this.IsLoading = false;this.show_status = true;
              this.SweetAlert();
              this.router.navigateByUrl("administration", { replaceUrl:true });
            } else {
              this.IsLoading = false; this.show_status = true;
              this.SweetAlert();
              this.router.navigateByUrl("user", { replaceUrl:true });
            }
          } else {
            this.IsLoading = false;
            this.ErrorMessage(this.response.message); this.show_status = false;
            setTimeout(() => { this.show_status = true; }, 2000);
          }
        });
      }
    } else {
        sessionStorage.clear();
    }
  }

  // * Password Visibility [Show/Hide]
  ChangeVisibility() {
    if (this.getPasswordType === 'password') {
      this.getPasswordType = 'text';
      this.eye_show = "fa fa-eye-slash field-icon";
    } else {
      this.getPasswordType = 'password';
      this.eye_show = "fa fa-eye field-icon";
    }
  }

  // * Float Message [Successful Message!]
  SweetAlert() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Successfully Logged In',
      showConfirmButton: false,
      timer: 2000
    })
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
