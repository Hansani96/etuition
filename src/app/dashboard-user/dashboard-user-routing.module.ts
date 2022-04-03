import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardUserComponent } from './dashboard-user.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';

import { ClzManagementComponent } from './clz-management/clz-management.component';
import {ViewMyClzComponent} from './view-my-clz/view-my-clz.component'
import {EditClzComponent} from './edit-clz/edit-clz.component';
import {ChangePswComponent} from './change-psw/change-psw.component';
const routes: Routes = [
  { path: '', redirectTo: 'dashboard/home', pathMatch:'full'},
  { path: 'dashboard', component: DashboardUserComponent,
      children: [
        { path: 'home', component: HomeComponent},
        { path: 'profile', component: UserProfilePageComponent },

        { path: 'clz-management', component: ClzManagementComponent  },
        { path: 'clz-management/view-my-clz', component: ViewMyClzComponent  },
        { path: 'clz-management/view-my-clz/edit-clz/:id', component: EditClzComponent  },
        {path:'change-psw',component:ChangePswComponent  },

      ]},
  { path: '**', redirectTo: 'dashboard/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardUserRoutingModule { }
