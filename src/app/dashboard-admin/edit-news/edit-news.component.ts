import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {ConnectionService} from "../../service/connection.service";
import { environment } from 'src/environments/environment';
import { HttpClient,HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent implements OnInit {

  constructor(private router :ActivatedRoute,private dataService: ConnectionService,private http:HttpClient) { }
  response:any = [];
  apiUrl = environment.apiUrl;
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

  disable_file_uplaod_button:any = true; // disable uplaod button
  thumb_errors:any; // show thubnail errors
  file_errors:any;// show file erros
  progress: number = 0; ProgressBar: any;
  news_id:any

  ngOnInit(): void {
    this.news_id = this.router.snapshot.params['id']; //
    this.CheckValidations();//check validations
    this. getNews();
  }

  CheckValidations () {
    this.newsform = new FormGroup({

      'head_line' : new FormControl(null, Validators.required),
      'news_cat' : new FormControl(null, Validators.required),
      'des': new FormControl(null, Validators.required),
     })
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


  getNews(){
    this.dataService.FindData('/get-single-news',this.news_id ).subscribe(res => {
      this.response =res;
      console.log(res)

       this.newsform.patchValue({
        head_line: this.response.data.head_line,
        news_cat: this.response.data.news_cat,
        des:this.response.data.des,


       })

    });
  }

  updateNews(){
    if(this.selectedFile== null && this.selectedThumbFile == null){
      console.log('true');
      const fd = new FormData();
      fd.append('id',this.news_id);
      fd.append('head_line',this.newsform.value.head_line);
      fd.append('news_cat',this.newsform.value.news_cat);
      fd.append('des',this.newsform.value.des);
      this.http.post(this.apiUrl+'/update-news',fd,{
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
    fd.append('id',this.news_id);
    fd.append('head_line',this.newsform.value.head_line);
    fd.append('news_cat',this.newsform.value.news_cat);
    fd.append('des',this.newsform.value.des);
    fd.append('news_banner',this.selectedFile,this.selectedFile.name);
   // fd.append('material_thumbnail',this.selectedThumbFile,this.selectedThumbFile.name)
    this.http.post(this.apiUrl+'/update-news',fd,{
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
