import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../service/connection.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-forgot-page',
  templateUrl: './forgot-page.component.html',
  styleUrls: ['./forgot-page.component.scss']
})
export class ForgotPageComponent implements OnInit {

  constructor(private dataService: ConnectionService, private router: Router) { }

  // * Local Initialization
  forgetform = new FormGroup({});
  ErrorMessage = "";
  LockSubmit: boolean = false; LoadingStatus: boolean = true;
  submitted: boolean = false;

  // * Local Variables
  response:any;
  show_status = true;

  ngOnInit(): void {
    this.CheckValidations ();
  }

  // * Check Form Validation
  CheckValidations () {
    this.forgetform = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email])
    });
  }

  // * Forget Password - Send Email
  ForgotPassword () {
    this.submitted = true;
    if(!this.forgetform.valid) {
      return;
    } else {
      this.LockSubmit = true; this.LoadingStatus = false; this.show_status = true;
      this.dataService.PutData('/forgot-password', this.forgetform.value).subscribe(res => {
        this.response = res;
        if (this.response.status === 1) {
          this.LockSubmit = false; this.LoadingStatus = true;
          this.SweetAlert();
        } else {
          this.LockSubmit = false; this.LoadingStatus = true;
          this.ErrorMessage ="We could not find your email address!";
          this.show_status = false;
        }
      });
    }
  }

  // * Float Message [Successful Message!] 
  SweetAlert() {
    Swal.fire({
      title: "Reset link Sent Successfully",
      text: "Please check your email to reset your password",
      icon: "success",
      showConfirmButton: true,
      confirmButtonText: "Back to login",
      confirmButtonColor: "#FDB415",
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      }
    });
  }
}
