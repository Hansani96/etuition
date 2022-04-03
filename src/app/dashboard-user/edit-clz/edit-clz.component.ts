import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {ConnectionService} from "../../service/connection.service";
import { environment } from 'src/environments/environment';
import { HttpClient,HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-edit-clz',
  templateUrl: './edit-clz.component.html',
  styleUrls: ['./edit-clz.component.scss']
})
export class EditClzComponent implements OnInit {

  constructor(private router :ActivatedRoute,private dataService: ConnectionService,private http:HttpClient) { }
   // file uplaod variables
   showThumb:any; //show thub nail
   clzsform = new FormGroup({}); // from group
   selectedThumbFileName ="Choose File"; // chose file display variable
   selectedFileName = ""; // selected file name

  CheckProgress = true;
  uplaod_pro:any; // uplaod progress display
  upalod_status_message:any =[]; // display upalod status
  selectedThumbFile : File = null as any; // selected thubnail variable
  //selectedThumbFileName:any = '';
  selectedFile: File = null as any; // selected file store variable

  update_res :any=[]; // store upalod response

  disable_file_uplaod_button:any = false; // disable uplaod button
  thumb_errors:any; // show thubnail errors
  file_errors:any;// show file erros
  progress: number = 0; ProgressBar: any;

  teacher_res:any = [];
  teachers:any=[];



  apiUrl = environment.apiUrl;
  clz_id:any
  response:any = [];
  ngOnInit(): void {
    this.clz_id = this.router.snapshot.params['id'];
    this.CheckValidations();
    this.getClz();
  }

  CheckValidations () {
    this.clzsform = new FormGroup({
      'clz_name' : new FormControl(null, Validators.required),

      'year' : new FormControl(null, [Validators.required, Validators.pattern('[0-9]{4}')]),
      'grade': new FormControl(null, Validators.required),
      'subject': new FormControl(null, Validators.required),
      'fee': new FormControl(null,[Validators.required,Validators.pattern('^[0-9]*$')]),
      'address': new FormControl(null, Validators.required),
      'des': new FormControl(null, Validators.required),

     })
  }
  getClz(){
    this.dataService.FindData('/get-user-single-clz',this.clz_id ).subscribe(res => {
      this.response =res;
      console.log(res)

       this.clzsform.patchValue({
        clz_name: this.response.data.clz_name,

        year:this.response.data.year,
        grade:this.response.data.grade,
        subject:this.response.data.subject,
        fee:this.response.data.fee,
        address:this.response.data.address,
        des:this.response.data.des,
       })

    });
  }

  onfileSelected(event:any){
    this.file_errors ="";
    this.selectedFile = event.target.files[0];
    this.selectedFileName =this.selectedFile.name;
    let fileSize = 0;
    let ext = null ;
    fileSize = (Math.round( this.selectedFile.size * 100 / (1024 * 1024)) / 100);
    if(fileSize>4){
      this.disable_file_uplaod_button = false;
      this.file_errors ="Please Enter Valid Image File(Maximum file sizes is 4MB)";
    }
    else{
      ext=this.selectedFile.name.split('?')[0].split('.').pop();
      if(ext=='jpg' || ext=='JPG' || ext=='jpeg' || ext=='JPEG' || ext=='png' || ext =='PNG' ){

        this.disable_file_uplaod_button = true;
      }
      else{
        this.disable_file_uplaod_button = false;
        this.file_errors ="Please Enter Valid Image File(Maximum file sizes is 4MB)";
      }
    }
  }

  updateClz(){
    if(this.selectedFile== null && this.selectedThumbFile == null){
      console.log('true');
      const fd = new FormData();
      fd.append('id',this.clz_id);
      fd.append('clz_name',this.clzsform.value.clz_name);

      fd.append('year',this.clzsform.value.year);
      fd.append('grade',this.clzsform.value.grade);
      fd.append('subject',this.clzsform.value.subject);
      fd.append('fee',this.clzsform.value.fee);
      fd.append('address',this.clzsform.value.address);
      fd.append('des',this.clzsform.value.des);

      this.http.post(this.apiUrl+'/update-user-clz',fd,{
            reportProgress:true,
            observe:'events'
      }).subscribe(event =>{
        this.update_res = event;
        //console.logthis.update_profile_res = events;
        if(event.type === HttpEventType.UploadProgress){
          this.uplaod_pro='Uplaod Progress ' + Math.round( this.update_res.loaded /  this.update_res.total*100)+'%';
          console.log(this.uplaod_pro);
        }
        else if(this.update_res.type === HttpEventType.Response){
          this.upalod_status_message=this.update_res.body ;
          console.log(this.upalod_status_message);
          //message
        this.uplaod_pro = " ";
        }
        //this.disable_file_uplaod_button = false;
       this.ngOnInit();
      });
   }else{
    const fd = new FormData();
    fd.append('id',this.clz_id);
    fd.append('clz_name',this.clzsform.value.clz_name);

    fd.append('year',this.clzsform.value.year);
    fd.append('grade',this.clzsform.value.grade);
    fd.append('subject',this.clzsform.value.subject);
    fd.append('fee',this.clzsform.value.fee);
    fd.append('address',this.clzsform.value.address);
    fd.append('des',this.clzsform.value.des);
    fd.append('banner',this.selectedFile,this.selectedFile.name);
   // fd.append('material_thumbnail',this.selectedThumbFile,this.selectedThumbFile.name)
    this.http.post(this.apiUrl+'/update-user-clz',fd,{
      reportProgress:true,
      observe:'events'
    }).subscribe(event =>{
      this.update_res = event;
      //console.logthis.update_profile_res = events;
      if(event.type === HttpEventType.UploadProgress){
        this.uplaod_pro='Uplaod Progress ' + Math.round( this.update_res.loaded /  this.update_res.total*100)+'%';
        console.log(this.uplaod_pro);
      }
      else if(this.update_res.type === HttpEventType.Response){
        this.upalod_status_message=this.update_res.body ;
        console.log(this.upalod_status_message);
        //message
      this.uplaod_pro = " ";
      }



      //this.disable_file_uplaod_button = false;

     this.ngOnInit();
    });
  }

  }

}
