import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../service/connection.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Event as NavigationEvent } from "@angular/router";
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../app/service/auth.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {

  constructor(private dataService: ConnectionService, private router: Router,private auth: AuthService,private route : ActivatedRoute) {
  
  }
  StyleDisplay: string = "none";
  StyleWidth: string = "0";
  profileUrl = environment.ResUrl;
  user_profile  : any  = this.auth.retrieve_profile_image();
  pro_img:any;
  title = "Dashboard";

   // Import Class
   user = new User();
   user_id: any;
 
   // Local Variables
   response:any;
   result:any =[];
   c_user:any=[];
   c_user_d:any=[]; 
  auth_token:any;
  ngOnInit(): void {
    if(this.user_profile=='null'){
      this.pro_img = "../../assets/img/profile/avatar.webp" ;
    }
    else{
      this.pro_img = this.profileUrl+'/storage/profile/'+this.user_profile;
    }
    this.c_user = this.auth.profile_details();
   this. c_user_d=JSON.parse(this.c_user)
   this.auth_token = localStorage.getItem('token')
   console.log(this.auth_token)
  }

  // * Local Initialization * //
 

 
  
  openNav() {
    this.StyleDisplay = "block";
    this.StyleWidth = "250px";
  }

  closeNav() {
    this.StyleDisplay = "none";
    this.StyleWidth = "0";
  }

  Logout() {

    this.dataService.PutData('/user/logout', null).subscribe(res => {
      localStorage.clear();
      this.router.navigate(['../../login']);
    });
  }

  

  
}
