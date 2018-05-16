import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-portal',
  template: `
  <mat-toolbar class="portal-header" color="primary">
  
  </mat-toolbar>
  <div class="portal-body"><router-outlet></router-outlet></div>
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
  
  .portal-body
  {
    flex:1;
    display:flex;
    align-items:stretch;
    flex-direction: column;
  }
  `]
})
export class PortalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
