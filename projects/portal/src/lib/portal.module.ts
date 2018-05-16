import { NgModule, ModuleWithProviders } from '@angular/core';
import { PortalComponent } from './components/portal/portal.component';

import { AccountSigninComponent } from './components/account/signin/account.signin.component';
import { AccountSignoutComponent } from './components/account/signout/account.signout.component';
import { AccountSignupComponent } from './components/account/signup/account.signup.component';
import { AccountForgotComponent } from './components/account/forgot/account.forgot.component';
import { AccountActivateComponent } from './components/account/activate/account.activate.component';
import { CardComponent } from './components/card/card.component';

import {
  MatToolbarModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { PortalService } from './services/portal.service';

const appRoutes: Routes = [
  { path: 'account/signin', component: AccountSigninComponent },
  { path: 'account/signout', component: AccountSignoutComponent },
  { path: 'account/forgot', component: AccountForgotComponent },
  { path: 'account/signup', component: AccountSignupComponent},
  { path: 'account/activate', component: AccountActivateComponent},
  {
    path: '',
    redirectTo: '/account/signin',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/account/signin' }
];

@NgModule({
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [
    PortalComponent,
    AccountSigninComponent,
    AccountSignoutComponent,
    AccountSignupComponent,
    AccountForgotComponent,
    AccountActivateComponent,
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
    AccountActivateComponent,
    CardComponent
  ],
  providers: [PortalService]
})
export class PortalModule {}
