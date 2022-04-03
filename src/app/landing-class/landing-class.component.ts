import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ConnectionService } from '../service/connection.service';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { environment } from 'src/environments/environment';
import {MessageService} from '../service/message.service';
@Component({
  selector: 'app-landing-class',
  templateUrl: './landing-class.component.html',
  styleUrls: ['./landing-class.component.scss']
})
export class LandingClassComponent implements OnInit {

  constructor(private dataService: ConnectionService) { }
  response:any=[];
  searchClz:string = "";
  p: any;// HideNavigation = true;
  imgUrl = environment.ResUrl;
  ngOnInit(): void {
    this.getAllClz();
  }

  getAllClz(){
    this.dataService.getData('/get-landing-adds').subscribe(res=>{
      console.log(res)
      this.response = res;
    });
  }

}
