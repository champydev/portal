import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'lib-portal-account-signin',
  template: `
<lib-portal-card [icon]="'perm_identity'" [title]="'Authentification'" [cardWidth]="400" [cardHeight]="400">
  <form [formGroup]="signinForm" class="signin-form">
    <mat-form-field>
      <input matInput formControlName="email" type="email" placeholder="E-mail">
    </mat-form-field>
    <div class="error-container">
    <mat-error *ngIf="signinForm.controls['email'].hasError('email') && !signinForm.controls['email'].hasError('required')">
        Veuillez saisir une adresse e-mail valide
    </mat-error>
    <mat-error *ngIf="!signinForm.controls['email'].hasError('email') && signinForm.controls['email'].hasError('required')">
        Veuillez saisir une adresse e-mail
    </mat-error>
    </div>

    <mat-form-field >
    <input matInput  formControlName="password" type="password" placeholder="Mot de passe" >
    </mat-form-field>
    <div class="error-container">
      <mat-error *ngIf="!signinForm.controls['password'].hasError('required') && signinForm.controls['password'].hasError('minlength')">
          Veuillez saisir un mot de passe de 6 caractères minimum
      </mat-error>
      <mat-error *ngIf="signinForm.controls['password'].hasError('required') && !signinForm.controls['password'].hasError('minlength')">
          Veuillez saisir un mot de passe
      </mat-error>
    </div>

    <mat-checkbox class="remember-me-checkbox" formControlName="remeberMe">Se souvenir de moi</mat-checkbox>
    <button [disabled]="!signinForm.valid" (click)="onConnectClick();" class="connect-button" mat-raised-button color="primary">Connexion</button>
 
  </form>
  <div style="flex:1;"></div>
  <div class="link-container">
    <a href="/#/account/signup">Créer un compte</a>  
    <div style="flex:1;"></div>
    <a href="/#/account/forgot">Mot de passe oublié</a>
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
  .signin-form
  {
    display: flex;   
    margin:10px;
    padding:0px;
    border: 0px;
    flex-direction: column;
  }
  .link-container
  {
    display: flex;
    margin:10px;
    padding:0px;
    border: 0px;
    flex-direction: row;
  }
  .error-container
{
  min-height: 16px;
  font-size:12px;
  font-weight:bold;
}
  .connect-button
  {
    margin-top:20px;
  }
  .remember-me-checkbox
  {
    margin-top:10px;
    margin-bottom:10px;
  }

  `]
})
export class AccountSigninComponent implements OnInit {

  signinForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remeberMe: [true, [Validators.required]]
    });
  }
  onConnectClick() {

  }
  ngOnInit() {
  }

}
