import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/service/connection.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: ConnectionService) { }

  // * Session Storage Variables * //
  user_id: any = sessionStorage.getItem('ids');
  Activation: any = sessionStorage.getItem('active');

  // * Local Initialization * //
  User_Activation: string = this.Activation;
  User_Active_State: string = "1"
  profileUrl = environment.ResUrl;


  // * Import Class * //

  // * Local Variables & Arrays * //
  response:any;
  count:any;
  latest_news:any = [];
  latest_docs:any = [];

  ngOnInit(): void {
    this.dataService.getData('/get_teacher_db_count').subscribe(res =>{
      this.count=res;
     });
  // get latest videos
      this.dataService.getData('/get-recent-new-t').subscribe(res =>{
        this.latest_news=res;
        console.log(this.latest_news);
      });
  //get latest pdf  info
      this.dataService.getData('/get-recent-clz_t').subscribe(res =>{
        this.latest_docs=res;
        console.log(this.latest_docs);
      });
  }



  // * Check User Status & Disable The Play Button * //
  CheckUserActivation() {
    return this.Activation == 1;
  }

}
