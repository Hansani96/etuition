import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../service/connection.service';
import { Router } from '@angular/router';

import { interval } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: ConnectionService, private router: Router) { }

  count:any;
  latest_news:any = [];
  latest_docs:any = [];
  ngOnInit(): void {
    //total num student
    this.dataService.getData('/get_teacher_count').subscribe(res =>{
    this.count=res;
   });
// get latest videos
    this.dataService.getData('/get-recent-news').subscribe(res =>{
      this.latest_news=res;
      console.log(this.latest_news);
    });
//get latest pdf  info
    this.dataService.getData('/get-recent-clz').subscribe(res =>{
      this.latest_docs=res;
      console.log(this.latest_docs);
    });



  }

}
