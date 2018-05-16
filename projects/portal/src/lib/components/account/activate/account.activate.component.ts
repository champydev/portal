import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-portal-account-activate',
  template: `
  Sign in !
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
export class AccountActivateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
