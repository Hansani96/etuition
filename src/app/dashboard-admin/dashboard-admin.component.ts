import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../service/connection.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Event as NavigationEvent } from "@angular/router";
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../app/service/auth.service';
@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
    // ? VARIABLE DECLARATION
    ids: any;
  constructor(private dataService: ConnectionService, private router: Router,private auth: AuthService,private route : ActivatedRoute) {
    // TODOthis.route.paramMap.subscribe((params) => {this.ids= params.snaps})
    this.ids=this.route.snapshot.firstChild?.params["id"]
    // TODO : Get the Current Router & Change the Title
    this.router.events.subscribe(( event: NavigationEvent ) : void => {
      this.router = router;
      if ( event instanceof NavigationEnd ) {
        if (this.router.isActive("/administration/dashboard/home", true )) {
          this.title = "Dashboard"
        }
        if (this.router.isActive("/administration/dashboard/user-management", true )) {
          this.title = "Student Management"
        }
        if (this.router.isActive("/administration/dashboard/news-management", true )) {
          this.title = "News Management"
        }
        if (this.router.isActive("/administration/dashboard/news-management/view-all-news", true )) {
          this.title = "View All News"
        }

        if (this.router.isActive("/administration/dashboard/news-management/view-all-news/edit-news/"+this.ids, true )) {
          this.title = "Update News"
        }
        if (this.router.isActive("/administration/dashboard/clz-management", true )) {
          this.title = "Class Management"
        }
        if (this.router.isActive("/administration/dashboard/clz-management/view-all-clz", true )) {
          this.title = "View All Class"
        }

      }
    });
  }

  // Local Initialization
  title = "Dashboard";
  StyleDisplay: string = "none";
  StyleWidth: string = "0";

  // Import Class
  user = new User();
  user_id: any;

  // Local Variables
  response:any;
  result:any =[];
  c_user:any=[];
  c_user_d:any=[];
  //admin styleUrls
  //environment
  profileUrl = environment.ResUrl;
  user_profile  : any  = this.auth.retrieve_profile_image();
  pro_img:any;

  ngOnInit(): void {

    if(this.user_profile=='null'){
      this.pro_img = "../../assets/img/profile/avatar.webp" ;
    }
    else{
      this.pro_img = this.profileUrl+'/storage/profile/'+this.user_profile;
    }
    this.c_user = this.auth.profile_details();
   this. c_user_d=JSON.parse(this.c_user)
  }




  Logout() {
    this.dataService.PutData('/user/logout', null).subscribe(res => {
      localStorage.clear();
      this.router.navigate(['../../login']);
    })
  }

  openNav() {
    this.StyleDisplay = "block";
    this.StyleWidth = "250px";
  }

  closeNav() {
    this.StyleDisplay = "none";
    this.StyleWidth = "0";
  }
}
