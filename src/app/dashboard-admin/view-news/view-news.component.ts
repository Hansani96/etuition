import { Component, OnInit } from '@angular/core';

import { ConnectionService } from '../../service/connection.service';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-view-news',
  templateUrl: './view-news.component.html',
  styleUrls: ['./view-news.component.scss']
})
export class ViewNewsComponent implements OnInit {

  constructor(private http:HttpClient,private dataService: ConnectionService) { }
  response:any=[];
  ChangeStyle: string = 'color: coral'; ChangeVisibility: boolean = false;
  Message:any = [];
  assignedMat:any = [];
  apiUrl = environment.apiUrl;
  p: any; HideNavigation = true;
  searchClz:string = "";
  allAssignedMat:any = [];
  newsInfo:any = [];
  ngOnInit(): void {
    this.getAllNews();
  }
  getAllNews(){
    this.dataService.getData('/get-news').subscribe(res=>{
      console.log(res)
      this.newsInfo = res;
    });
  }
  changeStatus(id:any,status:any){
    console.log("s"+status)
    const fd = new FormData();
    fd.append('id',id);
    fd.append('is_publish',status);
    this.http.post(this.apiUrl+'/publish-un-publish',fd).subscribe(res=>{
      this.response=res;
      console.log(res)
      if (this.response.status ==1 ){

        this.SuccessMessage("Change Updated");
        this.ngOnInit();
      }
      else{
        this.ErrorMessage("News Setting not Updated");
      }
    })
  }

  ErrorMessage (message: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
    })

    Toast.fire({
      icon: 'error',
      title: message
    })
  }
  SuccessMessage (message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
    })

    Toast.fire({
      icon: 'success',
      title: message
    })
  }
}
