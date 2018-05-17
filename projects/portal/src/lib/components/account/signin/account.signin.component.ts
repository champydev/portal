import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lib-portal-account-signin',
  template: `
<lib-portal-card [icon]="'perm_identity'" [title]="'Authentification'" [cardWidth]="400" [cardHeight]="300">

<div  style="display: flex;flex:1;flex-direction: column;" *ngIf="error && !waiting">
<div  style="display: flex;margin: 10px;align-items:center;">

    <div class="mat-error" style="margin-left:10px">
      <mat-icon>error</mat-icon>
    </div>

    <div class="mat-error" style="margin-left:10px;flex:1;">
     {{errorMessage}}
    </div>

  </div>
  <div style="flex: 1;"></div>
  <div class="link-container">
    <a href="/#/account/signup">Créer un compte</a>
    <div style="flex:1;"></div>
    <a href="/#/account/signin" (click)="onConnectClick();">Se connecter</a>
    </div>
</div>

<div  style="display: flex;flex:1;flex-direction: column;" *ngIf="waiting && !error">
  <div  style="flex: 1;">
    <div class="spinner-container">
      <div style="flex: 1;"></div>
      <mat-spinner></mat-spinner>
      <div style="flex: 1;"></div>
    </div>
  </div>

  <div style="display: flex;margin: 10px;align-items:center;">

    <div style="margin-left:10px;">
      <mat-icon>compare_arrows</mat-icon>
    </div>

    <div style="margin-left:10px;flex:1;">
     Connexion en cours ...
    </div>

  </div>

</div>
<div *ngIf="!waiting && !error" class='input-container'>
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
     margin-top:50px;
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
  errorMessage = '';
  signinForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remeberMe: [true, [Validators.required]]
    });
  }
  onActionClick() {
    this.error = false;
    this.waiting = true;
    setTimeout(() => {
      this.waiting = false;
      this.error = true;
      this.errorMessage ='Test erreur';
    }, 3000);
  }
  onConnectClick()
  {
    console.log('connect click');
  }
  ngOnInit() {}
}
