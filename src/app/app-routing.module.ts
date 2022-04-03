import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guard Services
import { AuthGuard } from './guard/auth.guard';

// Import Components
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPageComponent } from './reset-page/reset-page.component';
import { ForgotPageComponent } from './forgot-page/forgot-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { RolesGuard } from './guard/roles.guard';
import { LandingClassComponent } from './landing-class/landing-class.component';

const routes: Routes = [
  { path: '',
    //canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: LandingComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent, },
      { path: 'forgot-password', component: ForgotPageComponent },
      { path: 'reset-password', component: ResetPageComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'class-adds', component: LandingClassComponent },
    ]
  },

  { path: 'administration',
    data: { role: '1' },
    loadChildren: () => import('./dashboard-admin/dashboard-admin.module').then(m => m.DashboardAdminModule),
    canLoad: [AuthenticationGuard, RolesGuard] },

  { path: 'user',
    data: { role: '0' },
    loadChildren: () => import('./dashboard-user/dashboard-user.module').then(m => m.DashboardUserModule),
    canLoad: [AuthenticationGuard, RolesGuard]  },

  { path: '', redirectTo: '', pathMatch:'full', canActivate: [AuthenticationGuard]},
  { path: '**', redirectTo: '', pathMatch:'full', canActivate: [AuthenticationGuard]}

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
