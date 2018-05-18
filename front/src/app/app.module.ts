import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './components/app/app.component';
import { PortalModule } from 'portal';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JwtGuard } from 'portal';
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [JwtGuard] },
];
@NgModule({
  declarations: [
    AppComponent, HomeComponent
  ],
  imports: [
    BrowserModule,
    PortalModule,
    RouterModule.forRoot(appRoutes, {
      useHash: true
    }),
    CommonModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
/**
 * Module principal.
 */
export class AppModule { }
