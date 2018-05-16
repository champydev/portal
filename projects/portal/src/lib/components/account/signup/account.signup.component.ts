import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-portal-account-signup',
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
export class AccountSignupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
