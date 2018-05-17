import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-portal',
  template: `
  <mat-toolbar class="portal-header" color="primary">

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

  constructor() { }

  ngOnInit() {


  }

}
