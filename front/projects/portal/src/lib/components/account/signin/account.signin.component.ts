import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordService } from '../../../services/password.service';
import { AccountService } from '../../../services/account.service';
@Component({
  selector: 'lib-portal-account-signin',
  template: `
<lib-portal-card [icon]="'perm_identity'" [title]="'Authentification'" [cardWidth]="400" [cardHeight]="350">

<lib-portal-form-async-result style="flex:1;"
 [waitingMessage]="'Authentification en cours ...'" 
 [errorMessages]="errorMessages"
 [successMessages]="successMessages"
 *ngIf="waiting || error || success" [waiting]="waiting"></lib-portal-form-async-result>

<!--               Formulaire                        -->
<div *ngIf="!waiting && !error  && !success" class='input-container'>
  <form [formGroup]="signinForm" class="input-form">

  <!--        Champ Email        -->
  <div class="field-container">
    <mat-form-field style="flex:1;">
      <input matInput formControlName="email" type="email" placeholder="E-mail">
    </mat-form-field>
    <lib-portal-form-error-icon [control]="signinForm.controls['email']"></lib-portal-form-error-icon>
  </div>


  <!--        Champ Password      -->
  <div class="field-container">
    <mat-form-field style="flex:1;">
    <input matInput  formControlName="password" type="password" placeholder="Mot de passe" >
    </mat-form-field>
    <lib-portal-form-error-icon [control]="signinForm.controls['password']"></lib-portal-form-error-icon>
  </div>

  <mat-checkbox  formControlName="remeberMe">Se souvenir de moi</mat-checkbox>
  <button [disabled]="!signinForm.valid" (click)="onActionClick();" class="action-button" mat-raised-button color="primary">
    Connexion
  </button>

  </form>
  <div style="flex:1;"></div>
  <div class="link-container">
  <a href="/#/account/signup">Créer un compte</a>
  <div style="flex:1;"></div>
  <a href="/#/account/forgot">Mot de passe oublié</a>
  </div>
</div>

</lib-portal-card>
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


  `
  ]
})
export class AccountSigninComponent implements OnInit {
  waiting = false;
  error = false;
  success = false;
  errorMessages = [];
  successMessages = [];
  signinForm: FormGroup;
  constructor(private fb: FormBuilder,private passwordService : PasswordService,private accountService : AccountService) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remeberMe: [true, [Validators.required]]
    });
  }
  async onActionClick() {
    this.error = false;
    this.waiting = true;
    setTimeout(async () => {
      const hash = this.passwordService.hashPassword(this.signinForm.controls['password'].value);
     const email = this.signinForm.controls['email'].value;
     try{
       await this.accountService.signin(email,hash);
       this.waiting = false;
       this.error = false;
       this.success = true;
       this.successMessages = ['Authentification réussi','Redirection vers la page d\'acceuil'];  
     }
     catch(e){
        this.waiting = false;
        this.error = true;
        this.success = false;
        this.errorMessages = [(<Error>e).message]; 
     }
  
    //  this.errorMessage = 'Erreur on se sait pas quoi';
    }, 1000);
  }
  onConnectClick() {
    console.log('connect click');
  }
  ngOnInit() { }
}
