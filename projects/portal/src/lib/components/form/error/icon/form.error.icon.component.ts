import { Component, OnInit, Input } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
@Component({
  selector: 'lib-portal-form-error-icon',
  template: `
  <mat-icon  [matTooltip]="errorTooltipMessage" *ngIf="!control.pristine && !control.valid" class="error-icon">error</mat-icon>
  `,
  styles: [
    `
    :host
    {
      width:24px;
      height:24px;
      display:flex;

    }
    .error-icon
    {
      margin: auto;
      margin-left: 4px;
      color: red;
    }
  `
  ]
})
export class FormErrorIconComponent implements OnInit {
  @Input('control') control: FormControl;
  errorTooltipMessage: string = null;
  constructor() {}

  ngOnInit() {
    if (this.control == null) {
      return;
    }
    console.log('form control ', this.control);
    this.control.statusChanges.subscribe(() => {
      if (this.control.errors == null) {
        return;
      }
      const errorKeys = Object.keys(this.control.errors);

      if (errorKeys.length > 0) {
        const messages: string[] = [];
        errorKeys.forEach((key: string) => {
          const value = this.control.errors[key];
          if (key === 'email' && value === true) {
            messages.push('Adresse e-mail invalide');
          } else if (key === 'minlength' && value.requiredLength != null) {
            messages.push(
              'Texte trop court, ' +
                value.requiredLength +
                ' caractères minimum'
            );
          } else if (key === 'maxlength' && value.requiredLength != null) {
            messages.push(
              'Texte trop long, ' + value.requiredLength + ' caractères maximum'
            );
          } else if (key === 'required'){
            messages.push( 'Saisie obligatoire');
          } else if (key === 'notStrength')
          {
            messages.push( 'Pas assez sécurisé');
          }
          else if (key === 'notEqual')
          {
            messages.push( 'Pas identique');
          }


          else {
            console.log('Erreur non géré ' + key, value);
          }
        });

        this.errorTooltipMessage = messages.join('\r\n');
      } else {
        this.errorTooltipMessage = null;
      }
    });
  }
}
