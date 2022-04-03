
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpEventType } from '@angular/common/http';
import  {Material} from '../../model/material';
import { ConnectionService } from '../../service/connection.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-clz-management',
  templateUrl: './clz-management.component.html',
  styleUrls: ['./clz-management.component.scss']
})
export class ClzManagementComponent implements OnInit {

  material = new Material();
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

constructor(private http:HttpClient,private dataService: ConnectionService) { }

 ngOnInit(): void {
    this.CheckValidations ();
    this.dataService.getData('/get-teacher-for-clz').subscribe(res =>{
      console.log(res)
      this.teachers=res;
     });
 }

  //fileURL ="http://127.0.0.1:8000/api/add-materials";
  CheckValidations () {
    this.clzsform = new FormGroup({
      'clz_name' : new FormControl(null, Validators.required),
   
      'year' : new FormControl(null, [Validators.required, Validators.pattern('[0-9]{4}')]),
      'grade': new FormControl(null, Validators.required),
      'subject': new FormControl(null, Validators.required),
      'fee': new FormControl(null,[Validators.required,Validators.pattern('^[0-9]*$')]),
      'address': new FormControl(null, Validators.required),
      'des': new FormControl(null, Validators.required),
      'banner': new FormControl(null, Validators.required),
     })
  }


  // onthumbSelected(event:any){
  //   this.thumb_errors ="";
  //   this.selectedThumbFile = event.target.files[0];
  //   this.selectedThumbFileName =this.selectedThumbFile.name;
  //   let fileSize = 0;
  //   let ext = null ;

  //   fileSize = (Math.round( this.selectedThumbFile.size * 100 / (1024 * 1024)) / 100);
  //   if(fileSize>3){
  //     this.disable_file_uplaod_button = false;
  //     this.thumb_errors ="Please Enter Valid Image(Maximum file sizes is 3mb)";
  //   }
  //   else{
  //     ext=this.selectedThumbFile.name.split('?')[0].split('.').pop();
  //     if(ext=='jpg' || ext=='JPG' || ext=='jpeg' || ext=='JPEG' || ext=='png' || ext =='PNG'  ){

  //       this.disable_file_uplaod_button = true;
  //     }
  //     else{
  //       this.disable_file_uplaod_button = false;
  //       this.thumb_errors ="Please Enter Valid Image(Maximum file sizes is 3mb)";
  //     }
  //   }
  // }

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

  submitMaterials(){

    const fd = new FormData();
      fd.append('clz_name',this.clzsform.value.clz_name);
     
      fd.append('year',this.clzsform.value.year);
      fd.append('grade',this.clzsform.value.grade);
      fd.append('subject',this.clzsform.value.subject);
      fd.append('fee',this.clzsform.value.fee);
      fd.append('address',this.clzsform.value.address);
      fd.append('des',this.clzsform.value.des);
      fd.append('banner',this.selectedFile,this.selectedFile.name);
     // fd.append('material_thumbnail',this.selectedThumbFile,this.selectedThumbFile.name)
      this.http.post(this.apiUrl+'/create-clz-teacher',fd,{
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
