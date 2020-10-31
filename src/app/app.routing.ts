import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { CommonLayoutComponent } from './common-layout/common-layout.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full',
  }, {
    path: '',
    component: CommonLayoutComponent,
    children: [{
      path: '',
      //loadChildren: './common-layout/common-layout.module#CommonLayoutModule'
      loadChildren: () => import('./common-layout/common-layout.module').then(m => m.CommonLayoutModule)
    }]
  },
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: 'ResetPassword',
    component: ResetPasswordComponent
  },
  {
    path: 'ForgotPassword',
    component: ChangePasswordComponent
  },
  {
    path: 'SignUp/:encrpUserName',
    component: SignUpComponent
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
