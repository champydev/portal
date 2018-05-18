import { FormErrorIconComponent } from './components/form/error/icon/form.error.icon.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './components/portal/portal.component';

import { AccountSigninComponent } from './components/account/signin/account.signin.component';
import { AccountSignoutComponent } from './components/account/signout/account.signout.component';
import { AccountSignupComponent } from './components/account/signup/account.signup.component';
import { AccountForgotComponent } from './components/account/forgot/account.forgot.component';
import { AccountActivateComponent } from './components/account/activate/account.activate.component';
import { CardComponent } from './components/card/card.component';
import {AsyncResultComponent} from './components/form/async/result/async.result.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatTooltipModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { PortalService } from './services/portal.service';
import { PasswordService } from './services/password.service';
import {AccountService} from './services/account.service';
import {JwtGuard } from './guards/jwt.guard';
import {AccountPasswordComponent} from './components/account/password/account.password.component';
const appRoutes: Routes = [
  { path: 'account/password', component: AccountPasswordComponent },
  { path: 'account/signin', component: AccountSigninComponent },
  { path: 'account/signout', component: AccountSignoutComponent,canActivate:[JwtGuard] },
  { path: 'account/forgot', component: AccountForgotComponent },
  { path: 'account/signup', component: AccountSignupComponent },
  { path: 'account/activate', component: AccountActivateComponent },
 
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [
    PortalComponent,
    AccountSigninComponent,
    AccountSignoutComponent,
    AccountSignupComponent,
    AsyncResultComponent,
    AccountForgotComponent,
    FormErrorIconComponent,
    AccountActivateComponent,
    AccountPasswordComponent,
    CardComponent
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    PortalComponent,
    AccountSigninComponent,
    AccountSignoutComponent,
    AccountSignupComponent,
    AccountForgotComponent,
    AsyncResultComponent,
    FormErrorIconComponent,
    AccountPasswordComponent,
    AccountActivateComponent,
    CardComponent
    
  ],
  providers: [JwtGuard,PortalService, PasswordService,AccountService,{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true } ]
})
export class PortalModule { }
