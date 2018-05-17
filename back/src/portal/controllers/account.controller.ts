

import { Controller, Get, Post, Body,HttpException,HttpStatus,Inject } from '@nestjs/common';
import {AccountService} from '../services/account.service';
@Controller('api/account/')
export class AccountController {

    constructor(private readonly accountService: AccountService)
    {}
    @Post('signin')
    async signin(@Body() body: any) {    
        if (body == null) throw new HttpException('Aucun paramètres fournis', HttpStatus.NOT_ACCEPTABLE);
        if (body.email == null) throw new HttpException('Paramètres email manquant', HttpStatus.NOT_ACCEPTABLE);
        if (body.hash == null) throw new HttpException('Paramètres hash manquant', HttpStatus.NOT_ACCEPTABLE);
        const users = await this.accountService.findAll();
        console.log(users);
        return {
            token:'oki'
        };
    }
}