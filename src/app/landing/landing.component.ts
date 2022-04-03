import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ConnectionService } from '../service/connection.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private dataService: ConnectionService) { }
  response:any=[];
  imgUrl = environment.ResUrl;
  p:any;
  HideNavigation = true;
  clz_res:any=[]
  ngOnInit(): void {
    this.getNews();
    this.getAllClz();
  }

  getNews(){
    this.dataService.getData('/get-news-for-landing').subscribe(res=>{
     this.response = res;

    });
  }
  Logo_Url = environment.logoUrl;
  getAllClz(){
    this.dataService.getData('/get-landing-adds').subscribe(res=>{
      console.log(res)
      this.clz_res = res;
    });
  }


}
