import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpEventType } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../../model/user';
import { ConnectionService } from '../../service/connection.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-change-psw',
  templateUrl: './change-psw.component.html',
  styleUrls: ['./change-psw.component.scss']
})
export class ChangePswComponent implements OnInit {

  constructor(private dataService: ConnectionService,private http:HttpClient, private router: Router) { }
  update_password_res:any = [];

  submitted: boolean = false;
  LockSubmit: boolean = false;

 
  ngOnInit(): void {
    this.CheckValidations();
  }
  pswfrm = new FormGroup({}); // from group
  ChangeStyle: string = 'color: coral'; ChangeVisibility1: boolean = false; 
   // update password
   upDateSubmit(){
    this.submitted = true;
    if(!this.pswfrm.valid) {
      return;
    } else {
      this.dataService.PutData('/update-password',this.pswfrm.value).subscribe(res=>{
        this.SweetAlert();
      });
    }
  }
  
  CheckValidations () {
    this.pswfrm = new FormGroup({
      'oldpassword' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      'password_confirmation' : new FormControl(null, [Validators.required]),
    }); // from group

  }

  // * Float Message [Successful Message!] 
  SweetAlert() {
    Swal.fire({
      title: "Password Changed",
      text: "Your password has been changed successfully. Use your new password to log in",
      icon: "success",
      allowOutsideClick: false,
      showConfirmButton: true, showDenyButton: true,
      confirmButtonText: "Logout now", denyButtonText: "Keep me logged in",
      confirmButtonColor: "#FDB415", denyButtonColor: "#666666",
    }).then((result) => {
      if (result.isConfirmed) {
        this.Logout();
      }
    });
  }

  Logout() {
    this.dataService.PutData('/user/logout', null).subscribe(res => {
      sessionStorage.clear();
      this.router.navigate(['../../login']);
    });
  }
}
