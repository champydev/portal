import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-portal-account-signin',
  template: `
  <lib-portal-card [cardWidth]="400" [cardHeight]="400">
  yesssss
  </lib-portal-card>
  `,
  styles: [`
  :host {
    display: flex;
    flex: 1;
    margin:0px;
    padding:0px;
    border: 0px;
  }

  `]
})
export class AccountSigninComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
