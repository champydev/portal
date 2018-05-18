import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { PasswordService } from '../../../services/password.service';
import { PasswordCheckStrength } from './../../../enums/password.check.strength.enum';
import { MatTooltip } from '@angular/material';
import {AccountService} from '../../../services/account.service';
@Component({
  selector: 'lib-portal-account-signup',
  template: `


  <lib-portal-card [icon]="'perm_identity'" [title]="'Modifier le mot de passe'" [cardWidth]="500" [cardHeight]="300">

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
    <a href="/#/account/signin">Se connecter</a>
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
    Modification du mot de passe en cours ...
    </div>
  </div>
</div>







<div *ngIf="!waiting && !error" class='input-container'>
  <form [formGroup]="passwordForm" class="input-form">

  


  <!--        Champ Password      -->

  <div style="display:flex;flex-direction:column;">

    <div style="display:flex;flex-direction:row;">
      <div style="flex:1;" class="field-container">
        <mat-form-field style="flex:1;">
        <input autocomplete="off" matInput  formControlName="password" type="password" placeholder="Mot de passe" >
        </mat-form-field>
        <lib-portal-form-error-icon [control]="passwordForm.controls['password']"></lib-portal-form-error-icon>
      </div>

      <div  style="flex:1;"  class="field-container">
        <mat-form-field style="flex:1;">
        <input autocomplete="off" matInput  formControlName="confirmPassword" type="password" placeholder="Confirmation mot de passe" >
        </mat-form-field>
        <lib-portal-form-error-icon [control]="passwordForm.controls['confirmPassword']"></lib-portal-form-error-icon>
      </div>
    </div>



    <div *ngIf="!passwordForm.controls['password'].pristine">
      <mat-icon *ngIf="passwordStrength >= 1" style="color: red;">view_column</mat-icon>
      <mat-icon *ngIf="passwordStrength >= 2" style="color: orange;">view_column</mat-icon>
      <mat-icon *ngIf="passwordStrength >= 4" style="color: yellow;">view_column</mat-icon>
      <mat-icon *ngIf="passwordStrength >= 8"  style="color: yellowgreen;">view_column</mat-icon>
      <mat-icon *ngIf="passwordStrength >= 16" style="color: green;">view_column</mat-icon>
    </div>
    <div *ngIf="!passwordForm.controls['password'].pristine">{{passwordStrengthMessage}}</div>
  </div>



  <button [disabled]="!passwordForm.valid" (click)="onActionClick();" class="action-button" mat-raised-button color="primary">
    Créer mon compte
  </button>

  </form>
  <div style="flex:1;"></div>
  <div class="link-container">
  <a href="/#/account/signin">Se connecter</a>
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
      margin-left:4px;
      margin-right:4px;
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
export class AccountPasswordComponent implements OnInit {

  passwordForm: FormGroup;
  passwordStrength: PasswordCheckStrength;
  passwordStrengthMessage = 'Mot de passe trop court';
  errorMessage : string = null;
  waiting = false;
  error =false;
  private _token : string= null;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private passwordService: PasswordService,
    private accountService : AccountService
  ) {
    this.passwordForm = this.fb.group({     
      password: ['', [this.validateStrength.bind(this)]],
      confirmPassword: ['', [, this.validateAreEqual.bind(this)]]     
    });
  }
  ngOnInit() {
    this.route
    .queryParams
    .subscribe(params => {       
        this._token = params['token'];
        console.log(this._token);
    });

  }

  private validateStrength(fieldControl: FormControl) {
    const value = fieldControl.value;
    this.passwordStrength = this.passwordService.checkPasswordStrength(value);
    switch (this.passwordStrength) {
      case PasswordCheckStrength.Short:
        this.passwordStrengthMessage = 'Mot de passe trop court';

        return {
          notStrength: true
        };
      case PasswordCheckStrength.Common:
        this.passwordStrengthMessage = 'Mot de passe trop commun';

        return {
          notStrength: true
        };
      case PasswordCheckStrength.Weak:

        this.passwordStrengthMessage = 'Mot de passe pas assez varié';
        return {
          notStrength: true
        };
      case PasswordCheckStrength.Ok:

        this.passwordStrengthMessage = 'Mot de passe valide';
        return null;
      case PasswordCheckStrength.Strong:

        this.passwordStrengthMessage = 'Mot de passe sécurisé';
        return null;
    }
  }
  private validateAreEqual(fieldControl: FormControl) {
    if (this.passwordForm != null) {
      return fieldControl.value === this.passwordForm.get('password').value
        ? null
        : {
            notEqual: true
          };
    } else {
      return null;
    }
  }
  async onActionClick() {
    this.error = false;
    this.waiting = true;
    setTimeout(async() => {
      try{
        const hash = this.passwordService.hashPassword(this.passwordForm.controls['password'].value);
        await this.accountService.updatePassword(hash,this._token);
      } catch(e){}
      this.waiting = false;
      this.error = true;
      this.errorMessage ='Test erreur';
    }, 3000);
  }
}
