
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpEventType } from '@angular/common/http';
import  {Material} from '../../model/material';
import { ConnectionService } from '../../service/connection.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-news-management',
  templateUrl: './news-management.component.html',
  styleUrls: ['./news-management.component.scss']
})
export class NewsManagementComponent implements OnInit {

  material = new Material();
  // file uplaod variables
   showThumb:any; //show thub nail
  newsform = new FormGroup({}); // from group
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





  apiUrl = environment.apiUrl;

constructor(private http:HttpClient,private dataService: ConnectionService) { }

 ngOnInit(): void {
    this.CheckValidations ();
 }

  //fileURL ="http://127.0.0.1:8000/api/add-materials";
  CheckValidations () {
    this.newsform = new FormGroup({
      'news_banner' : new FormControl(null, Validators.required),
      'head_line' : new FormControl(null, Validators.required),
      'news_cat' : new FormControl(null, Validators.required),
      'des': new FormControl(null, Validators.required),
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
      fd.append('head_line',this.newsform.value.head_line);
      fd.append('news_cat',this.newsform.value.news_cat);
      fd.append('des',this.newsform.value.des);
      fd.append('news_banner',this.selectedFile,this.selectedFile.name);
     // fd.append('material_thumbnail',this.selectedThumbFile,this.selectedThumbFile.name)
      this.http.post(this.apiUrl+'/create-news',fd,{
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
