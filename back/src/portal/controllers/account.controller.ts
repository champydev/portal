

import { Controller, Get, Post, Body,HttpException,HttpStatus } from '@nestjs/common';

@Controller('api/account/')
export class AccountController {

    @Post('signin')
    async signin(@Body() body: any) {    
        if (body == null) throw new HttpException('Aucun paramètres fournis', HttpStatus.NOT_ACCEPTABLE);
        if (body.email == null) throw new HttpException('Paramètres email manquant', HttpStatus.NOT_ACCEPTABLE);
        if (body.hash == null) throw new HttpException('Paramètres hash manquant', HttpStatus.NOT_ACCEPTABLE);
        
        return {
            token:'oki'
        };
    }
}