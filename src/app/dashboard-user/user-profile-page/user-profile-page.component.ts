import { HttpHeaders, HttpEventType, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { ConnectionService } from 'src/app/service/connection.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {

  constructor(private dataService: ConnectionService,private http:HttpClient) { }
  profileform = new FormGroup({});
  ErrorMessage: string = "";
  BorderColour: string = ""; // 3px solid red
  LockSubmit: boolean = false; LoadingStatus: boolean = true;
  submitted: boolean = false;


  // * Import Class * //
  user = new User();

  // * Local Variables * //
  response:any;
  user_ids: any;
  fileData:any;
  UserClasses:any = [];
  profileUrl = environment.ResUrl;
  apiUrl = environment.apiUrl;
  ngOnInit(): void {
    this.RetrieveData();
    this.CheckValidations();
  }

  // * Retrieve All Information of the Current User * //
  RetrieveData() {
    this.user_ids = localStorage.getItem('id');
    this.dataService.FindData('/show-teacher-profile', this.user_ids).subscribe(res => {
      this.response = res;
      console.warn( this.response)

      this.profileform.patchValue({
       profile: this.response.data[0].profile_access_link,
        firstname: this.response.data[0].firstname,
        lastname: this.response.data[0].lastname,
        year: this.response.data[0].year,
        bio: this.response.data[0].bio,
        phone: this.response.data[0].phone,
        email: this.response.data[0].email,
      })
    });
  }

  // * Check Form Validation * //
  CheckValidations() {
    this.profileform = new FormGroup({
      profile: new FormControl(null),
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),


      bio: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{10}$')]),
      email: new FormControl({value: null, disabled: true}, [Validators.required, Validators.email]),
    })
  }

  // * Get Profile Image * //
  fileEvent(event: any) {
    // TODO: Get file extension & Validate The Format
    var GetFileExt = event.target.files[0].name.match(/\.(.+)$/)[1];
    var GetFileExtL = GetFileExt.toLowerCase();
    if(GetFileExtL === 'jpg' || GetFileExtL ==='jpeg'){

      // TODO : Get file size & Validate The Size (Max : 5MB)
      if(event.target.files[0].size <=	5245329) {
        this.ErrorMessage = "";
        this.BorderColour = "3px solid green";
        this.fileData = event.target.files[0];
      } else {
        this.ErrorMessage = "The file size is too large. Allowed maximum size is 5MB";
        this.BorderColour = "3px solid red";
      }

    } else{
      this.ErrorMessage = "Invalid file format. Only jpeg or jpg are allowed";
      this.BorderColour = "3px solid red";
    }
  }

  UpdateAccount() {
    this.submitted = true;
    if(!this.profileform.valid) {
      return;
    } else {
      var UserData = new FormData();
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      UserData.append('profile', this.fileData);
      UserData.append('firstname', this.profileform.get('firstname')?.value);
      UserData.append('lastname', this.profileform.get('lastname')?.value);
      UserData.append('bio', this.profileform.get('bio')?.value);
      UserData.append('phone', this.profileform.get('phone')?.value);

      this.LockSubmit = true; this.LoadingStatus = false;
      this.http.post(this.apiUrl+'/update-teacher-profile-form', UserData, { headers: headers }).subscribe(res => {
        this.response = res;
        console.warn(this.response);
        if (this.response.status === 1) {
          this.LockSubmit = false; this.LoadingStatus = true;
          location.reload();
          this.ErrorMessage = "";
          this.BorderColour = "";
          this.RetrieveData();
        } else {
          console.log(this.response);
        }
      });
    }
  }

  ResetForm() {
    this.RetrieveData();
  }
}
