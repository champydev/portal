

import { JwtPayload } from '../interfaces/jwt.payload';
import * as jwt from 'jsonwebtoken';
import { Controller, Get, Post, Body, HttpException, HttpStatus, Inject, Headers } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { MailService } from '../services/mail.service';
import { UserService } from '../services/user.service';
@Controller('api/account/')
export class AccountController {

    constructor(private userService : UserService,private accountService: AccountService, private mailService: MailService) { }
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

    @Post('activate')
    async activate(@Body() body: any) {
        if (body == null) throw new HttpException('Aucun paramètres fournis', HttpStatus.NOT_ACCEPTABLE);
        if (body.token == null) throw new HttpException('Paramètres jeton manquant', HttpStatus.NOT_ACCEPTABLE);
        const requestPayload: JwtPayload = await <JwtPayload>jwt.verify(body.token, AccountService.jwtKey);
        const user = await this.userService.findById(requestPayload.id);
        if (user === null){
            throw new HttpException('Le compte n\'existe plus', HttpStatus.NOT_ACCEPTABLE);
        } else if (user.activated === true)
        {
            throw new HttpException('Le compte est déja activé', HttpStatus.NOT_ACCEPTABLE);
        } else{
            await this.userService.activateById(requestPayload.id);
            const token = await this.accountService.createToken(user,60);
            return {
                token: token
            };
        }

    }

    @Post('signup')
    async signup(@Body() body: any) {
        if (body == null) throw new HttpException('Aucun paramètres fournis', HttpStatus.NOT_ACCEPTABLE);
        if (body.nom == null) throw new HttpException('Paramètres nom manquant', HttpStatus.NOT_ACCEPTABLE);
        if (body.prenom == null) throw new HttpException('Paramètres prenom manquant', HttpStatus.NOT_ACCEPTABLE);
        if (body.email == null) throw new HttpException('Paramètres email manquant', HttpStatus.NOT_ACCEPTABLE);
        if (body.hash == null) throw new HttpException('Paramètres hash manquant', HttpStatus.NOT_ACCEPTABLE);
        try {
            const user = await this.userService.findByEmail(body.email);            
            if (user != null){
                throw new HttpException('Un compte existe déja avec cette adresse e-mail', HttpStatus.UNAUTHORIZED);
            }
            else{
                await this.accountService.signup(body.nom, body.prenom,body.email,body.hash);
                return { success: true };
            }
           
        } catch (e) {
            throw new HttpException(e, HttpStatus.UNAUTHORIZED);
        }
        
        
    }


    @Post('password')
    async password(@Body() body: any) {
        if (body == null) throw new HttpException('Aucun paramètres fournis', HttpStatus.NOT_ACCEPTABLE);
        if (body.token == null) throw new HttpException('Paramètres jeton manquant', HttpStatus.NOT_ACCEPTABLE);
        if (body.hash == null) throw new HttpException('Paramètres hash manquant', HttpStatus.NOT_ACCEPTABLE);
        const token: string = body.token;
        const hash: string = body.hash;
        try {
            const requestPayload: JwtPayload = await <JwtPayload>jwt.verify(token, AccountService.jwtKey)
            await this.userService.updatePassword(requestPayload.id,hash);
            return { success: true };
        } catch (e) {
            throw new HttpException(e, HttpStatus.UNAUTHORIZED);
        }

    }
    @Post('refresh')
    async refresh(@Headers() headers: any) {

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
    async signout() {
        return { success: true };
    }
    @Post('forgot')
    async forgot(@Body() body: any) {
        if (body == null) throw new HttpException('Aucun paramètres fournis', HttpStatus.NOT_ACCEPTABLE);
        if (body.email == null) throw new HttpException('Paramètres email manquant', HttpStatus.NOT_ACCEPTABLE);
        try {

            const token: string = await this.accountService.forgot(body.email);
            await this.mailService.sendForgotMail(body.email, token);

            return { success: true };
        }
        catch (e) {
            throw new HttpException(e, HttpStatus.NOT_ACCEPTABLE);
        }

    }
}