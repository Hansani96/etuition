import { Component, OnInit } from '@angular/core';

import { ConnectionService } from '../../service/connection.service';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-view-clzs',
  templateUrl: './view-clzs.component.html',
  styleUrls: ['./view-clzs.component.scss']
})
export class ViewClzsComponent implements OnInit {

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
  ngOnInit(): void {
    this.getClz();
  }
  getClz(){
    this.dataService.getData('/get-all-clzs').subscribe(res=>{
      console.log(res)
      this.clzInfo = res;
    });
  }
  changeStatus(id:any,status:any){
    console.log("s"+status)
    const fd = new FormData();
    fd.append('id',id);
    fd.append('is_publish',status);
    this.http.post(this.apiUrl+'/change-status',fd).subscribe(res=>{
      this.response=res;
      console.log(res)
      if (this.response.status ==1 ){

        this.SuccessMessage("Change Updated");
        this.ngOnInit();
      }
      else{
        this.ErrorMessage("Class Setting not Updated");
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
