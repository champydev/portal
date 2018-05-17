import { Component, OnInit, Input } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
@Component({
  selector: 'lib-portal-form-async-result',
  template: `
 
  <div style="flex:1;"></div>



  <!--           Attente         -->
<div *ngIf="waiting" style="display:flex;flex-direction:row;margin:8px;" >
    <div style="flex: 1;"></div>
    <mat-spinner></mat-spinner>
    <div style="flex: 1;"></div>
</div>

<div *ngIf="waiting" style="display:flex;flex-direction:row;margin:8px;" >
    <div style="flex: 1;"></div>
    <div style="font-size:14px;">{{waitingMessage}}</div>
    <div style="flex: 1;"></div>
</div>

  <!--           Erreur         -->
<div *ngIf="!waiting && errorMessages != null && errorMessages.length > 0" style="display:flex;flex-direction:row;margin:8px;" >
  <div style="flex: 1;"></div>
  <mat-icon style="font-size: 96px;height:100px;width:100px;text-align:center;vertical-align:middle;color:red;">error</mat-icon>
  <div style="flex: 1;"></div>
</div>

<div *ngIf="!waiting && errorMessages != null && errorMessages.length > 0">
  <ul>
    <li *ngFor="let errorMessage of errorMessages" style="list-style-type: none;">
      <div style="display: table;">
        <mat-icon style="display: table-cell; vertical-align: middle; ">error_outline</mat-icon>
        <div style="display: table-cell; vertical-align: middle; ">&nbsp;{{errorMessage}}</div>
      </div>
    </li>
  </ul>
</div>

  <!--           Succès         -->
  <div *ngIf="!waiting && successMessages != null && successMessages.length > 0" style="display:flex;flex-direction:row;margin:8px;" >
  <div style="flex: 1;"></div>
  <mat-icon style="font-size: 96px;height:100px;width:100px;text-align:center;vertical-align:middle;color:green;">done_all</mat-icon>
  <div style="flex: 1;"></div>
</div>

<div *ngIf="!waiting && successMessages != null && successMessages.length > 0">
  <ul>
    <li *ngFor="let successMessage of successMessages" style="list-style-type: none;">
      <div style="display: table;">
        <mat-icon style="display: table-cell; vertical-align: middle; ">done</mat-icon>
        <div style="display: table-cell; vertical-align: middle; ">&nbsp;{{successMessage}}</div>
      </div>
    </li>
  </ul>
</div>




  <div style="flex:1;"></div>
  `,
  styles: [
    `
    :host
    {     
        display:flex;
        align-items:stretch;
        flex-direction:column;

    }
  

  `
  ]
})
export class AsyncResultComponent {

  @Input('waitingMessage') waitingMessage: string = 'Processus en cours ...';



  @Input('waiting') waiting: boolean = true;


  @Input('errorMessages') errorMessages: string[] = null;
  @Input('successMessages') successMessages: string[] = null;


  constructor() {

   }


}
