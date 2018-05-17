import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';

import { AccountService } from '../services/account.service';
@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private accountService: AccountService,private router: Router) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        console.log("canActivate called");
        try{
        await this.accountService.refreshToken();
        console.log("canActivate success");
        return true;
       }
       catch(e)
       {
        console.log("canActivate fail",e);
        this.router.navigate(['/account/signin']);
        return false;
       }
        
     
  }

  
}