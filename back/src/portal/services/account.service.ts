import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../interfaces/jwt.payload';
import {MailService} from './mail.service';
@Injectable()
export class AccountService {
  public static jwtKey: string = `eyJhbGciOiJQUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2p3dC1pZHAuZXhhbXBsZS5jb20iLCJzdWIiOiJtYWlsdG86bWlrZUBleGFtcGxlLmNvbSIsIm5iZiI6MTUyNjU2MTUzOCwiZXhwIjoxNTI2NTY1MTM4LCJpYXQiOjE1MjY1NjE1MzgsImp0aSI6ImlkMTIzNDU2IiwidHlwIjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9yZWdpc3RlciJ9.FIVbOmgh-xwewnQPLr5X0Wp5coZrx_OZjCEQr6Q_RRw1V8eGnkQ1ZuCoug3VAQT6Cg6a23Wvm8P5Quq4QaQoLAsBdO_VBMFmdduBYS9eSpDa2tRhhIFIqFI9rxDu3jN1hgnn4zeHLerpP4CMc2huqitNugsibBsI5M4RFKMwjeSM7BOU3rSwNaeLNEKA4v68dxrqsuCYiKZ12F5Ws5PqhhIecroG6I-EABIOyImayiOsht57IxBRKDUtr9zHH3NaTROs98GZyMqllRK3nFV7AIaS7IiGIsg8amLlecgc-2vOLDm-NYB08TRYZJDfUTu7sIPqqC0n7ObBhhUqV_eUAw`;
  constructor(private userService: UserService,private mailService : MailService) {

  }
  async signup(nom: string, prenom: string,email: string,hash: string)
  {
     const user : User = await this.userService.create(nom, prenom,email,hash);
     const token = await this.createToken(user,'1d');
     await this.mailService.sendActivationMail(user,token);    
     return user;

  }

  async signin(email: string, hash: string): Promise<string> {
    const user = await this.userService.findByEmail(email);
    if (user != null && user.hash === hash) {
      const token = await this.createToken(user,60);
      return token;      
    }
    else{
      return null;
    }
  }
  async refresh(autorizationHeader : string)
  {
    if (autorizationHeader.length <= 'Bearer '.length)
    {
      throw new Error('Invalid autorization header');
    }
    const requestToken = autorizationHeader.substring('Bearer '.length);   
    const requestPayload: JwtPayload = await <JwtPayload>jwt.verify(requestToken,AccountService.jwtKey)
    const user = await this.userService.findById(requestPayload.id);
    if (user !== null && user.email === requestPayload.email){
      
      return await this.createToken(user,60);
    } else{
      throw new Error('Invalid token');
    }
    
   
  }
  async forgot(email : string)
  {
    const user = await this.userService.findByEmail(email);
    if (user != null) {
      const payload: JwtPayload = { id:user.id,email:user.email,date: new Date()};    
      const token = await jwt.sign(payload, AccountService.jwtKey, { expiresIn: "1d" });
      return token;
    }
    else{
      throw new Error('Utilisateur inexistant');
    }
  }
  async createToken(user : User,expiresIn : any ) {
    const payload: JwtPayload = { id:user.id,email:user.email,date: new Date()};    
    return await jwt.sign(payload, AccountService.jwtKey, { expiresIn: expiresIn });
  }


}