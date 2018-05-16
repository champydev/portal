import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'lib-portal-account-forgot',
  template: `
  <lib-portal-card [icon]="'perm_identity'" [title]="'Récupération de mot de passe oublié'" [cardWidth]="400" [cardHeight]="400">
  <form [formGroup]="forgotForm" class="forgot-form">
    <mat-form-field>
      <input matInput formControlName="email" type="email" placeholder="E-mail">
    </mat-form-field>
    <div class="error-container">
    <mat-error *ngIf="forgotForm.controls['email'].hasError('email') && !forgotForm.controls['email'].hasError('required')">
        Veuillez saisir une adresse e-mail valide
    </mat-error>
    <mat-error *ngIf="!forgotForm.controls['email'].hasError('email') && forgotForm.controls['email'].hasError('required')">
        Veuillez saisir une adresse e-mail
    </mat-error>
    </div>

    

  
    <button [disabled]="!forgotForm.valid" (click)="onResolveForgotClick();" class="resolve-forgot-button" mat-raised-button color="primary">Envoyer le mail de récupération de mot de passe oublié</button>
 
  </form>
  <div style="flex:1;"></div>
  <div class="link-container">
    <a href="/#/account/signup">Créer un compte</a>  
    <div style="flex:1;"></div>
    <a href="/#/account/signin">Se connecter</a>
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
  .forgot-form
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
  .resolve-forgot-button
  {
    margin-top:20px;
  }
  `]
})
export class AccountForgotComponent implements OnInit {

  forgotForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    
    });
  }

  onResolveForgotClick()
  {

  }
  ngOnInit() {
  }

}
