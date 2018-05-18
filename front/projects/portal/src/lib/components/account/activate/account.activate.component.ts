import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../services/account.service';
@Component({
  selector: 'lib-portal-account-activate',
  template: `
  <lib-portal-card [icon]="'perm_identity'" [title]="'Activer un compte'" [cardWidth]="500" [cardHeight]="500">

  <lib-portal-form-async-result style="flex:1;"
  [waitingMessage]="'Activation en cours ...'" 
  [errorMessages]="errorMessages"
  [successMessages]="successMessages"
  *ngIf="waiting || error || success" [waiting]="waiting"></lib-portal-form-async-result>


  


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

  `]
})
export class AccountActivateComponent implements OnInit {
  errorMessages: string[] = [];
  successMessages: string[] = [];
  waiting = true;
  error = false;
  success = false;
  private _token: string = null;
  constructor(private router : Router,private route: ActivatedRoute, private accountService: AccountService) {

  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this._token = params['token'];
        this.activateAccount();
      });

  }
  activateAccount() {
    this.waiting = true;
    setTimeout(async () => {
      try{
        await this.accountService.activate(this._token);
        this.waiting = false;
        this.error = false;
        this.success = true;
        this.successMessages = ['Votre compte as bien été activé','Redirection en cours vers la page d\'accueil'];
        setTimeout(()=>{
          this.router.navigate(['/home']);
        },1000);
      }
      catch(e){

        this.waiting = false;
        this.error = true;
        this.success = false;
        this.errorMessages = [e.message || e]
       
  
      }
     
    }, 1000);
  }

}
