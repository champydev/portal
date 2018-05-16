import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-portal-signin',
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
export class SigninComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
