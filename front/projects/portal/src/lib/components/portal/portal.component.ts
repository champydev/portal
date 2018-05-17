import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'lib-portal',
  template: `
  <mat-toolbar class="portal-header" color="primary"> 
    <div style="display:flex;flex-direction:row;flex:1;">
      <div>Titre</div>
      <div style="flex:1;"></div>
      <button *ngIf="showSignoutButton"  (click)="onSignoutClick();" class="action-button" mat-raised-button color="primary">
      Déconnexion
    </button>
    </div>
  </mat-toolbar>
  <router-outlet></router-outlet>
  `,
  styles: [`
  :host {
    display: flex;
    flex: 1;
    margin:0px;
    padding:0px;
    border: 0px;
    align-items:stretch;
    flex-direction: column;
  }

  `]
})
export class PortalComponent implements OnInit {

  showSignoutButton = false;
  constructor(private router : Router) { 
    this.router.events.subscribe((data) =>{
      const url :string = (<any>data).url;
      if (url != null){       
          this.showSignoutButton = !url.startsWith('/account');
         
      }
      else
      {
        this.showSignoutButton = false;
      }
      
    });
  }
  onSignoutClick()
  {
    this.router.navigate(['/account/signout']);
  }

  ngOnInit() {


  }

}
