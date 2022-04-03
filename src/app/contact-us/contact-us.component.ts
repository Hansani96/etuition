import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectionService } from 'src/app/service/connection.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contact_form = new FormGroup({});

  constructor(private dataService: ConnectionService) { }

  ngOnInit(): void {
    this.CheckValidations()
  }

  // * Local Initialization * //
  LockSubmit: boolean = false; LoadingStatus: boolean = true;
  Logo_Url = environment.logoUrl;

  // * Import Class * //

  // * Local Variables * //
  response:any;

  // * Check Form Validation * //
  CheckValidations() {
    this.contact_form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      mobile: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{10}$')]),
      message: new FormControl(null, Validators.required),
    })
  }

  SendInformation() {
    this.SweetAlert();
  }

    // * Float Message [Successful Message!]
    SweetAlert() {
      Swal.fire({
        title: 'Do you want to send this?',
        showCancelButton: true,
        confirmButtonText: 'Send',
        confirmButtonColor: '#FDB415',
      }).then((result) => {
        if (result.isConfirmed) {
          this.LockSubmit = true; this.LoadingStatus = false;
          this.dataService.PutData('/contact/info', this.contact_form.value).subscribe(data => {
          this.response = data;
            if(this.response.status === 1 ) {
              this.LockSubmit = false; this.LoadingStatus = true;
              this.contact_form.reset();           
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your inquiry sent successfully',
                showConfirmButton: false,
                timer: 2000
              });
            } else {
              console.log(this.response.error);
              this.LockSubmit = false; this.LoadingStatus = true;
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Something went wrong! Try again',
                showConfirmButton: false,
                timer: 2000
              });
            }      
          });
        } 
      });
    }
}




