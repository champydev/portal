import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-portal-card',
  template: `
  <div class="container" [style.width.px]="cardWidth" [style.height.px]="cardHeight">

  <mat-card class="inner-card">
  <mat-toolbar class="portal-header" color="primary">
  <mat-icon *ngIf="icon != null">{{icon}}</mat-icon>
  &nbsp;&nbsp;{{title}}&nbsp;
  </mat-toolbar>

  <mat-card-content>
  <div class="card-content">
  <ng-content></ng-content>
  </div>
  </mat-card-content>

</mat-card>





  </div>
  `,
  styles: [
    `
  :host {
    display: flex;
    flex: 1;
    margin:0px;
    padding:0px;
    border: 0px;
  }
  .container
  {
    margin: auto;
    margin-top:100px;
    display: flex;
    flex-direction : column;

  }
  .card-content
  {
    flex:1;
    display:flex;
    flex-direction:column;
  }
  .mat-card-content
  {
    flex:1 !important;
    display: flex;
  }
  .inner-card
  {
    margin:0px;
    padding:0px;
    flex:1;
    display:flex;
    flex-direction:column;

  }
  `
  ]
})
export class CardComponent implements OnInit {
  @Input('cardWidth') cardWidth = 200;
  @Input('cardHeight') cardHeight = 200;
  @Input('title') title = 'Untiteled';
  @Input('icon') icon = null;
  constructor() {}

  ngOnInit() {}
}
