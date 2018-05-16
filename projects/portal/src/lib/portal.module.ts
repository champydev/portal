import { NgModule,ModuleWithProviders } from '@angular/core';
import { PortalComponent } from './components/portal/portal.component';
import {SigninComponent} from './components/signin/signin.component';
import {MatToolbarModule,MatIconModule} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import {PortalService} from './services/portal.service';


const appRoutes: Routes = [
   { path: 'account/signin', component: SigninComponent },
  { path: '',
    redirectTo: '/account/signin',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/account/signin', }
];

@NgModule({
  imports: [
    MatToolbarModule,
    MatIconModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [PortalComponent,SigninComponent],
  exports: 
  [
    MatToolbarModule,
    MatIconModule,
    PortalComponent,
    SigninComponent
  ],
  providers:[PortalService]
})
export class PortalModule { 
 
}
