import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAdminRoutingModule } from './dashboard-admin-routing.module';
import { DashboardAdminComponent } from './dashboard-admin.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

//form modules
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

import { ChangePswComponent } from './change-psw/change-psw.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { NewsManagementComponent } from './news-management/news-management.component';
import { ViewNewsComponent } from './view-news/view-news.component';
import { EditNewsComponent } from './edit-news/edit-news.component';
import { ClzManagementComponent } from './clz-management/clz-management.component';
import { ViewClzsComponent } from './view-clzs/view-clzs.component';
import { ViewUnPublishClzComponent } from './view-un-publish-clz/view-un-publish-clz.component';
import { UpdateClzComponent } from './update-clz/update-clz.component';


@NgModule({
  declarations: [
    DashboardAdminComponent,
    HomeComponent,
    ProfileComponent,
    ChangePswComponent,
    UserManagementComponent,
    NewsManagementComponent,
    ViewNewsComponent,
    EditNewsComponent,
    ClzManagementComponent,
    ViewClzsComponent,
    ViewUnPublishClzComponent,
    UpdateClzComponent,
  ],
  imports: [
    CommonModule,
    DashboardAdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ]
})
export class DashboardAdminModule { }
