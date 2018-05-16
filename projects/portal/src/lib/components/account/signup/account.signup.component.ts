import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordService } from '../../../services/password.service';
import { PasswordCheckStrength } from './../../../enums/password.check.strength.enum';
import {MatTooltip} from '@angular/material'
import { nsend } from 'q';
@Component({
  selector: 'lib-portal-account-signup',
  template: `
  <lib-portal-card [icon]="'perm_identity'" [title]="'Créer un compte'" [cardWidth]="400" [cardHeight]="560">
  <form [formGroup]="signupForm" class="signup-form">
    
   <mat-form-field #tooltipPrenom="matTooltip" matTooltipPosition="right" [matTooltip]="tooltipErrorPrenom">
      <input matInput  formControlName="prenom" type="text" placeholder="Prénom" >
    </mat-form-field>
    

    <mat-form-field matTooltipPosition="right" [matTooltip]="tooltipErrorNom" >
      <input matInput  formControlName="nom" type="text" placeholder="Nom" >
    </mat-form-field>
   

  
    <mat-form-field>
      <input matInput formControlName="email" type="email" placeholder="E-mail">
    </mat-form-field>
    <div class="error-container">
    <mat-error *ngIf="signupForm.controls['email'].hasError('email') && !signupForm.controls['email'].hasError('required')">
        Veuillez saisir une adresse e-mail valide
    </mat-error>
    <mat-error *ngIf="!signupForm.controls['email'].hasError('email') && signupForm.controls['email'].hasError('required')">
        Veuillez saisir une adresse e-mail
    </mat-error>
    </div>

    <mat-form-field >
    <input matInput  formControlName="password" type="password" placeholder="Mot de passe" >
    </mat-form-field>
    <div>
      <div class="error-container">      
        
        <mat-icon *ngIf="passwordStrength >= 1" style="color: red;">view_column</mat-icon>
        <mat-icon *ngIf="passwordStrength >= 2" style="color: orange;">view_column</mat-icon>
        <mat-icon *ngIf="passwordStrength >= 4" style="color: yellow;">view_column</mat-icon>
        <mat-icon *ngIf="passwordStrength >= 8"  style="color: yellowgreen;">view_column</mat-icon>
        <mat-icon *ngIf="passwordStrength >= 16" style="color: green;">view_column</mat-icon>
        
      </div>
      <div>{{passwordStrengthMessage}}</div>
    </div>
    

    <mat-form-field >
    <input matInput  formControlName="confirmPassword" type="password" placeholder="Confirmation du mot de passe" >
    </mat-form-field>

    <div class="error-container">
    <mat-error *ngIf="signupForm.controls['confirmPassword'].hasError('notEqual')">
    Veuillez saisir le même mot de passe
  </mat-error>
    </div>


    
    <button [disabled]="!signupForm.valid" (click)="onSignupClick();" class="signup-button" mat-raised-button color="primary">Créer le compte</button>
 
  </form>
  <div style="flex:1;"></div>
  <div class="link-container">
    <a href="/#/account/signin">Se connecter</a>  
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
  .red
  {
    color: red;
  }
  .signup-form
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
   vertical-align: top;
   margin:10px;
    padding:0px;
    marrgin-bottom:12px;
}
  .signup-button
  {
    margin-top:20px;
  }
  
  `]
})

export class AccountSignupComponent implements OnInit {

  @ViewChild('tooltipPrenom') tooltipPrenom : MatTooltip;
  signupForm: FormGroup;
  tooltipErrorPrenom : string =null;
  tooltipErrorNom : string =null;
  passwordStrength: PasswordCheckStrength;
  passwordStrengthMessage = 'Mot de passe trop court';
  passwordStrengthColor = 'red';


  constructor(private fb: FormBuilder, private passwordService: PasswordService) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [this.validateStrength.bind(this)]],
      confirmPassword: ['', [, this.validateAreEqual.bind(this)]],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]]

    });
    this.signupForm.valueChanges.subscribe(() =>{
       this.checkTooltips();
    });
    this.checkTooltips();
  }
  ngOnInit() {
    setTimeout(()=>{     
      
    },300);
  }
  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  checkTooltips()
  {
    const ctrl = this.signupForm.controls['prenom'];
    
    if (this.signupForm.controls['prenom'].hasError('required'))
    {
      this.tooltipErrorPrenom = 'Veuillez saisir un prénom';
      if ( this.tooltipPrenom != null){        
        this.tooltipPrenom.show();
      }
     
    }
    else if (this.signupForm.controls['prenom'].hasError('minlength'))
    {
      this.tooltipErrorPrenom = 'Veuillez saisir un prénom de 2 catactères minimum';
      if ( this.tooltipPrenom != null){
        this.tooltipPrenom.show();
      }
    }
    else{
      this.tooltipErrorPrenom = null;
      if ( this.tooltipPrenom != null){
        this.tooltipPrenom.hide();
      }
    }

    if (this.signupForm.controls['nom'].hasError('required'))
    {
      this.tooltipErrorNom = 'Veuillez saisir un nom';
    }
    else if (this.signupForm.controls['nom'].hasError('minlength'))
    {
      this.tooltipErrorNom = 'Veuillez saisir un nom de 2 catactères minimum';
    }
    else{
      this.tooltipErrorNom = null;
    }
    
  }
  private validateStrength(fieldControl: FormControl) {
    const value = fieldControl.value;
    this.passwordStrength = this.passwordService.checkPasswordStrength(value);
    switch (this.passwordStrength) {
      case PasswordCheckStrength.Short:
        this.passwordStrengthMessage = 'Mot de passe trop court';
        this.passwordStrengthColor = 'red';
        return {
          notStrength: true
        };
      case PasswordCheckStrength.Common:
        this.passwordStrengthMessage = 'Mot de passe trop commun';
        this.passwordStrengthColor = 'orange';
        return {
          notStrength: true
        };
      case PasswordCheckStrength.Weak:
        this.passwordStrengthColor = 'yellow';
        this.passwordStrengthMessage = 'Mot de passe pas assez varié';
        return {
          notStrength: true
        };
      case PasswordCheckStrength.Ok:
        this.passwordStrengthColor = 'yellowgreen';
        this.passwordStrengthMessage = 'Mot de passe valide';
        return null;
      case PasswordCheckStrength.Strong:
        this.passwordStrengthColor = 'green';
        this.passwordStrengthMessage = 'Mot de passe sécurisé';
        return null;
    }

  }
  private validateAreEqual(fieldControl: FormControl) {
    if (this.signupForm != null) {
      return fieldControl.value === this.signupForm.get("password").value ? null : {
        notEqual: true
      };
    }
    else {
      return null;
    }

  }
  onSignupClick() { }
 
  

}
