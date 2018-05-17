import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {PortalModule} from 'portal';
import {PortalComponent} from 'portal';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
const appRoutes: Routes = [];
@NgModule({
  declarations: [    
    AppComponent
  ],
  imports: [
    BrowserModule,  
    PortalModule,
    RouterModule.forRoot(appRoutes,{
      useHash:true
    }),
    CommonModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
