import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';
@Component({
  selector: 'lib-portal-account-signout',
  template: `
  <lib-portal-card [icon]="'perm_identity'" [title]="'Déconnexion'" [cardWidth]="400" [cardHeight]="350">

<lib-portal-form-async-result style="flex:1;"
 [waitingMessage]="'Déconnexion en cours ...'" 
 [errorMessages]="errorMessages"
 [successMessages]="successMessages"
 *ngIf="waiting || error || success" [waiting]="waiting"></lib-portal-form-async-result>



  <div class="link-container">
    <a href="/#/account/signin">Se connecter</a>
    <div style="flex:1;"></div>
    <a href="/#/account/signup">Créer un compte</a>
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
export class AccountSignoutComponent implements OnInit {

  waiting = false;
  error = false;
  success = false;
  errorMessages :string[] = [];
  successMessages :string[] = [];
  constructor(private router : Router,private accountService : AccountService) { 
    this.waiting = true;
  }

  async ngOnInit() {
    setTimeout(async () =>{
      try{  
        await this.accountService.signout();
        this.error = false;
        this.success = true;
        this.waiting = false;
        this.successMessages=['Déconnexion réussi','Redirection vers la page d\'accueil'];
        setTimeout(() =>{
          this.router.navigate(['/home']);
        },1000);
      }
      catch (e){
        this.errorMessages= [e];
        this.error = true;
        this.success = false;
        this.waiting = false;
      }
    },1000);
   
  
  }

}
