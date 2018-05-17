import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
@Component({
  selector: 'lib-portal-account-forgot',
  template: `
  <lib-portal-card [icon]="'perm_identity'" [title]="'Mote de passe oublié'" [cardWidth]="400" [cardHeight]="350">

<lib-portal-form-async-result style="flex:1;"
 [waitingMessage]="'Récupération du mot de passe en cours ...'" 
 [errorMessages]="errorMessages"
 [successMessages]="successMessages"
 *ngIf="waiting || error || success" [waiting]="waiting"></lib-portal-form-async-result>

<!--               Formulaire                        -->
<div *ngIf="!waiting && !error  && !success" class='input-container'>
  <form [formGroup]="forgotForm" class="input-form">

  <!--        Champ Email        -->
  <div class="field-container">
    <mat-form-field style="flex:1;">
      <input matInput formControlName="email" type="email" placeholder="E-mail">
    </mat-form-field>
    <lib-portal-form-error-icon [control]="forgotForm.controls['email']"></lib-portal-form-error-icon>
  </div>

 <button [disabled]="!forgotForm.valid" (click)="onActionClick();" class="action-button" mat-raised-button color="primary">
    Envoyer le mail de récupération de mot de passe
  </button>

  </form>
  <div style="flex:1;"></div>
  <div class="link-container">
  <a href="/#/account/signup">Créer un compte</a>
  <div style="flex:1;"></div>
  <a href="/#/account/signin">Se connecter</a>
  </div>
</div>

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
  .field-container
  {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items:center;
  }
  .input-form
  {
    display: flex;
    margin:10px;
    padding:0px;
    border: 0px;
    flex-direction: column;
  }
  .input-container
  {
    display: flex;
    flex: 1;
    margin:0px;
    padding:0px;
    border: 0px;
    flex-direction: column;
  }
  .spinner-container
  {
     display:flex;
     flex-direction: row;
     align-items:center;
     flex:1;
     
  }
  .link-container
  {
    display: flex;
    margin:10px;
    padding:0px;
    border: 0px;
    flex-direction: row;
  }

  .action-button
  {
    margin-top:20px;
  }

  `]
})
export class AccountForgotComponent implements OnInit {
  waiting = false;
  error = false;
  success = false;
  errorMessages = [];
  successMessages = [];
  forgotForm: FormGroup;
  constructor(private fb: FormBuilder,private accountService : AccountService) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    
    });
  }

  async onActionClick()
  {
    this.waiting = true;
    setTimeout(async () =>{
      
      const email = this.forgotForm.controls['email'].value;
      try{
        await this.accountService.forgot(email);
        this.waiting = false;
        this.error = false;
        this.success = true;
        this.successMessages = ['Opération réussi','Un mail de récupération de mot de passe as été envoyé'];  
     
      }
      catch(e){
        this.waiting = false;
        this.error = true;
        this.success = false;
        this.errorMessages = [(<Error>e).message]; 
      }
     
    },1000);
  }
  ngOnInit() {
  }

}
