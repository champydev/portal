import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-portal-account-signout',
  template: `
  Sign up !
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
export class AccountSignoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
