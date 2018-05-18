import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { PasswordService } from '../../../services/password.service';
import { PasswordCheckStrength } from './../../../enums/password.check.strength.enum';
import { MatTooltip } from '@angular/material';
import { AccountService } from '../../../services/account.service';
@Component({
  selector: 'lib-portal-account-signup',
  template: `


  <lib-portal-card [icon]="'perm_identity'" [title]="'Créer un compte'" [cardWidth]="500" [cardHeight]="500">

  <lib-portal-form-async-result style="flex:1;"
  [waitingMessage]="'Authentification en cours ...'" 
  [errorMessages]="errorMessages"
  [successMessages]="successMessages"
  *ngIf="waiting || error || success" [waiting]="waiting"></lib-portal-form-async-result>






<div *ngIf="!waiting && !error && !success" class='input-container'>
  <form [formGroup]="signupForm" class="input-form">

  <!--        Champ Prénom        -->
  <div class="field-container">
    <mat-form-field style="flex:1;">
      <input autocomplete="off" matInput formControlName="prenom" type="text" placeholder="Prénom">
    </mat-form-field>
    <lib-portal-form-error-icon [control]="signupForm.controls['prenom']"></lib-portal-form-error-icon>
  </div>

  <!--        Champ Nom        -->
  <div class="field-container">
    <mat-form-field style="flex:1;">
      <input  autocomplete="off"  matInput formControlName="nom" type="text" placeholder="Nom">
    </mat-form-field>
    <lib-portal-form-error-icon [control]="signupForm.controls['nom']"></lib-portal-form-error-icon>
  </div>

  <!--        Champ Email        -->
  <div class="field-container">
    <mat-form-field style="flex:1;">
      <input  autocomplete="off"  matInput formControlName="email" type="email" placeholder="E-mail">
    </mat-form-field>
    <lib-portal-form-error-icon [control]="signupForm.controls['email']"></lib-portal-form-error-icon>
  </div>


  <!--        Champ Password      -->

  <div style="display:flex;flex-direction:column;">

    <div style="display:flex;flex-direction:row;">
      <div style="flex:1;" class="field-container">
        <mat-form-field style="flex:1;">
        <input  autocomplete="off"  matInput  formControlName="password" type="password" placeholder="Mot de passe" >
        </mat-form-field>
        <lib-portal-form-error-icon [control]="signupForm.controls['password']"></lib-portal-form-error-icon>
      </div>

      <div  style="flex:1;"  class="field-container">
        <mat-form-field style="flex:1;">
        <input  autocomplete="off"  matInput  formControlName="confirmPassword" type="password" placeholder="Confirmation mot de passe" >
        </mat-form-field>
        <lib-portal-form-error-icon [control]="signupForm.controls['confirmPassword']"></lib-portal-form-error-icon>
      </div>
    </div>



    <div *ngIf="!signupForm.controls['password'].pristine">
      <mat-icon *ngIf="passwordStrength >= 1" style="color: red;">view_column</mat-icon>
      <mat-icon *ngIf="passwordStrength >= 2" style="color: orange;">view_column</mat-icon>
      <mat-icon *ngIf="passwordStrength >= 4" style="color: yellow;">view_column</mat-icon>
      <mat-icon *ngIf="passwordStrength >= 8"  style="color: yellowgreen;">view_column</mat-icon>
      <mat-icon *ngIf="passwordStrength >= 16" style="color: green;">view_column</mat-icon>
    </div>
    <div *ngIf="!signupForm.controls['password'].pristine">{{passwordStrengthMessage}}</div>
  </div>



  <button [disabled]="!signupForm.valid" (click)="onActionClick();" class="action-button" mat-raised-button color="primary">
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
export class AccountSignupComponent implements OnInit {

  signupForm: FormGroup;
  passwordStrength: PasswordCheckStrength;
  passwordStrengthMessage = 'Mot de passe trop court';
  errorMessages: string[] = [];
  successMessages: string[] = [];
  waiting = false;
  error = false;
  success = false;
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private passwordService: PasswordService
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [this.validateStrength.bind(this)]],
      confirmPassword: ['', [, this.validateAreEqual.bind(this)]],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]]
    });
  }
  ngOnInit() { }

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
    if (this.signupForm != null) {
      return fieldControl.value === this.signupForm.get('password').value
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
    setTimeout(async () => {
      const nom: string = this.signupForm.controls['nom'].value;
      const prenom: string = this.signupForm.controls['prenom'].value;
      const email: string = this.signupForm.controls['email'].value;
      const hash = this.passwordService.hashPassword(this.signupForm.controls['password'].value);
      try {
        await this.accountService.signup(nom,prenom,email,hash);
        this.waiting = false;
        this.error = false;
        this.success = true;
        this.successMessages = ['Votre compte as bien été créer','Un e-mail d\'activation de votre compte viens de vous être envoyé'];
        
      } catch (e) {
        this.waiting = false;
        this.error = true;
        this.success = false;
        this.errorMessages = [e]
      }

     
    }, 1000);
  }
}
