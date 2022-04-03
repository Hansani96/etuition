import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../service/connection.service';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-view-my-clz',
  templateUrl: './view-my-clz.component.html',
  styleUrls: ['./view-my-clz.component.scss']
})
export class ViewMyClzComponent implements OnInit {

  constructor(private http:HttpClient,private dataService: ConnectionService) { }
  response:any=[];
  ChangeStyle: string = 'color: coral'; ChangeVisibility: boolean = false;
  Message:any = [];
  assignedMat:any = [];
  apiUrl = environment.apiUrl;
  p: any; HideNavigation = true;
  searchClz:string = "";
  allAssignedMat:any = [];
  clzInfo:any = [];
  user_ids:any;
  ngOnInit(): void {
    this.user_ids = localStorage.getItem('id');
    this.getMyClz()
  }

  getMyClz(){
    this.dataService.FindData('/get-single-clz-by-user', this.user_ids).subscribe(res=>{
      console.log(res)
      this.clzInfo = res;
    }); 
  }
}
