import { Controller, Get, Post, Body, HttpException, HttpStatus, Inject,Headers } from '@nestjs/common';
import {AccountService} from '../services/account.service';
import { JwtPayload } from '../interfaces/jwt.payload';
import * as jwt from 'jsonwebtoken';
export async function JwtMiddleware(req, res, next) {

    const path: string = req.path;
    if (path.startsWith('/api')) {
        if (        
        path === '/api/account/signin' || 
        path === '/api/account/forgot' || 
        path === '/api/account/password'|| 
        path === '/api/account/activate'|| 
        path === '/api/account/signup'){
            next();
        }
        else{
            
            let authorization :string = req.headers.authorization;
            if (authorization == null){
                const err = new HttpException("Pas de jeton", HttpStatus.UNAUTHORIZED);
                next(err);
            }else{
                if (authorization.startsWith('Bearer ')){
                    authorization = authorization.substring('Bearer '.length);
                }
                try{
                   
                    const requestPayload: JwtPayload = await <JwtPayload>jwt.verify(authorization,AccountService.jwtKey)
                    next();
                }catch(e){
                    const err = new HttpException(e, HttpStatus.UNAUTHORIZED);
                    console.log('Erreur de jeton',e);
                    next(err);
                }
                
            }
        }
       
       
    }
    else { next(); }

};