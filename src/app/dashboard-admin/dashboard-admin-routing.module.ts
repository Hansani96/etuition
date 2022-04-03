import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { ProfilePageComponent } from '../profile-page/profile-page.component';
import { DashboardAdminComponent } from './dashboard-admin.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import {ChangePswComponent} from './change-psw/change-psw.component';
import{UserManagementComponent} from './user-management/user-management.component';
import {NewsManagementComponent} from './news-management/news-management.component';
import {ViewNewsComponent} from './view-news/view-news.component';
import { EditNewsComponent } from './edit-news/edit-news.component';
import { ClzManagementComponent} from  './clz-management/clz-management.component';
import { ViewClzsComponent } from './view-clzs/view-clzs.component';
import {ViewUnPublishClzComponent} from './view-un-publish-clz/view-un-publish-clz.component';
import { UpdateClzComponent } from './update-clz/update-clz.component';
const routes: Routes = [
  { path: '', redirectTo: 'dashboard/home', pathMatch:'full'},
  { path: 'dashboard', component: DashboardAdminComponent,
      children: [
        /*{ path: 'profile', component: ProfilePageComponent },*/
        { path: 'home', component:HomeComponent  },
        { path: 'admin-profile', component:ProfileComponent },
        {path:'change-psw',component:ChangePswComponent  },
        {path:'user-management',component:UserManagementComponent  },
        {path:'news-management',component:NewsManagementComponent  },
        {path:'news-management/view-all-news',component:ViewNewsComponent  },
        {path:'news-management/view-all-news/edit-news/:id',component:EditNewsComponent  },
        {path: 'clz-management', component:ClzManagementComponent },
        {path:'clz-management/view-all-clz',component:ViewClzsComponent },
        {path:'clz-management/view-un-publish-all-clz',component:ViewUnPublishClzComponent },
        {path:'clz-management/view-all-clz/edit-clz/:id',component:UpdateClzComponent },


  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardAdminRoutingModule { }
