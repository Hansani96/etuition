import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardUserRoutingModule } from './dashboard-user-routing.module';
import { DashboardUserComponent } from './dashboard-user.component';

import { HomeComponent } from './home/home.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';

import { ClzManagementComponent } from './clz-management/clz-management.component';
import { ViewMyClzComponent } from './view-my-clz/view-my-clz.component';
import { EditClzComponent } from './edit-clz/edit-clz.component';
import { ChangePswComponent } from './change-psw/change-psw.component';


@NgModule({
  declarations: [
    DashboardUserComponent,

    HomeComponent,
    UserProfilePageComponent,

    ClzManagementComponent,
    ViewMyClzComponent,
    EditClzComponent,
    ChangePswComponent,

  ],
  imports: [
    CommonModule,
    DashboardUserRoutingModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ]
})
export class DashboardUserModule { }
