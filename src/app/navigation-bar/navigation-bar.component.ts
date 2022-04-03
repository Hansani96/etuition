import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import{AuthService} from '../service/auth.service';
import { ConnectionService } from '../service/connection.service';
import { NavigationEnd, Router } from '@angular/router';
import {MessageService} from '../service/message.service';
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  constructor(private auth: AuthService,private dataService: ConnectionService,private router: Router,private messageService: MessageService) { }
  IsLoggedIn: boolean = this.auth.IsLoggedIn();
  role:any
  ngOnInit(): void {
    this.role =this.auth.retrieve_role()
    console.log(this.role)
  }

  LogoutUser(){
    this.dataService.PutData('/user/logout', null).subscribe(res => {
      localStorage.clear();
      this.router.navigate(['../../login']);
    })
  }

  NavigationByRoles(value: string) {
    switch(value) {
      case '1': {

        this.router.navigateByUrl("administration");
        break;
      }
      case '0': {

        this.router.navigateByUrl("user");
        break;
      }

      case 'none': {
        this.messageService.ErrorMessage("You have no right permission");
        break;
      }
      default: {
        this.messageService.ErrorMessage("You have no right permission");
        break;
      }
    }
  }
  Logo_Url = environment.logoUrl;

  GoHome() { this.NavigationByRoles(this.role) }
}
