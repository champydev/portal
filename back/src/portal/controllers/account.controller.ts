

import { Controller, Get, Post, Body, HttpException, HttpStatus, Inject,Headers } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { MailService } from '../services/mail.service';
@Controller('api/account/')
export class AccountController {

    constructor(private accountService: AccountService,private mailService:MailService) { }
    @Post('signin')
    async signin(@Body() body: any) {
        if (body == null) throw new HttpException('Aucun paramètres fournis', HttpStatus.NOT_ACCEPTABLE);
        if (body.email == null) throw new HttpException('Paramètres email manquant', HttpStatus.NOT_ACCEPTABLE);
        if (body.hash == null) throw new HttpException('Paramètres hash manquant', HttpStatus.NOT_ACCEPTABLE);
        const token: string = await this.accountService.signin(body.email, body.hash);
        if (token !== null) {
            return {
                token: token
            };
        } else {
            throw new HttpException('Utilisateur inexistant ou mot de passe erroné', HttpStatus.UNAUTHORIZED);
        }


    }
    @Post('refresh')
    async refresh(@Headers() headers: any) 
    {
        
         if (headers == null) throw new HttpException('Aucun entêtes fournis', HttpStatus.NOT_ACCEPTABLE);
         if (headers.authorization == null) throw new HttpException('Entêtes authorization non fournis', HttpStatus.NOT_ACCEPTABLE);
         const token: string = await this.accountService.refresh(headers.authorization);
         if (token !== null) {
            return {
                token: token
            };
        } else {
            throw new HttpException('Impossible de renouveller le jeton', HttpStatus.UNAUTHORIZED);
        }
     
    }

    @Post('signout')
    async signout(){
        return { success:true};
    }
    @Post('forgot')
    async forgot(@Body() body: any){
        if (body == null) throw new HttpException('Aucun paramètres fournis', HttpStatus.NOT_ACCEPTABLE);
        if (body.email == null) throw new HttpException('Paramètres email manquant', HttpStatus.NOT_ACCEPTABLE);
        try{
           
            const token: string = await this.accountService.forgot(body.email);
            await this.mailService.sendForgotMail(body.email ,token);
        
            return { success:true};
        }
        catch(e){
            throw new HttpException(e, HttpStatus.NOT_ACCEPTABLE);
        }
        
    }
}