import { Injectable } from '@angular/core';
import * as cryptoJs from 'crypto-js';
import {PasswordCheckStrength} from '../enums/password.check.strength.enum';

@Injectable()
export class PasswordService {

    
    private commonPasswordPatterns = /passw.*|12345.*|09876.*|qwert.*|asdfg.*|zxcvb.*|footb.*|baseb.*|drago.*/;
   
    constructor() { }

    public hashPassword(password : string ) : string{
        return cryptoJs.SHA512(cryptoJs.SHA256(password).toString()+'salt'+ cryptoJs.SHA3(password).toString()+'pepper'+cryptoJs.MD5(password).toString()).toString();
    }
    public isPasswordCommon(password: string): boolean {
        return this.commonPasswordPatterns.test(password);
    }

    public checkPasswordStrength(password: string): PasswordCheckStrength {

        let numberOfElements = 0;
        numberOfElements = /.*[a-z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Lowercase letters
        numberOfElements = /.*[A-Z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Uppercase letters
        numberOfElements = /.*[0-9].*/.test(password) ? ++numberOfElements : numberOfElements;      // Numbers
        numberOfElements = /[^a-zA-Z0-9]/.test(password) ? ++numberOfElements : numberOfElements;   // Special characters (inc. space)        
        let currentPasswordStrength = PasswordCheckStrength.Short;      
        if (password === null || password.length < 5) {
            currentPasswordStrength = PasswordCheckStrength.Short;
        } else if (this.isPasswordCommon(password) === true) {
            currentPasswordStrength = PasswordCheckStrength.Common;
        } else if (numberOfElements === 0 || numberOfElements === 1 || numberOfElements === 2) {
            currentPasswordStrength = PasswordCheckStrength.Weak;
        } else if (numberOfElements === 3) {
            currentPasswordStrength = PasswordCheckStrength.Ok;
        } else {
            currentPasswordStrength = PasswordCheckStrength.Strong;
        }
        return currentPasswordStrength;
    }
}
