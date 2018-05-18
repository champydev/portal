import { Injectable, Inject } from '@nestjs/common';
import * as nodeMailer from 'nodemailer';
import {UserService} from './user.service';
import { User } from '../entities/user.entity';
@Injectable()
export class MailService {
    private _baseUrl = 'http://localhost:4000/#/';
    private _forgotMailTemplate = 
`
        Bonjour @Prenom @Nom,<br/><br/>

    Vous avez demandé à récupérer votre mot de passe suite à un oublie.<br/><br/>

    Pour mettre à jour votre mot de passe cliquer sur le lien ci-dessous : <br/>
    <a href="@Link">@Link</a><br/><br/>

    Bonne fin de journée.

`;
private _activateMailTemplate = 
`
        Bonjour @Prenom @Nom,<br/><br/>

    Vous avez créer un compte sur notre plate-forme mais il n'est pas encore actif.<br/><br/>

    Pour activer votre compte cliquer sur le lien ci-dessous : <br/>
    <a href="@Link">@Link</a><br/><br/>

    Bonne fin de journée.

`;
    constructor(private userService : UserService) {

    }

    async sendActivationMail(user : User,token : string)
    {
        let mailContent = this._activateMailTemplate;
        mailContent = mailContent.replace("@Prenom",user.prenom);
        mailContent = mailContent.replace("@Nom",user.nom);
        mailContent = mailContent.replace("@Prenom",user.prenom);
        const url = this._baseUrl+'account/activate?token='+token;
        mailContent = mailContent.replace("@Link",url);
        mailContent = mailContent.replace("@Link",url);
        const mailOptions = {
            from: 'dev.loic.lecuyer@gmail.com', 
            to: user.email, 
            subject: 'Activation de compte', 
            html: mailContent,
        };
        await this.sendMail(mailOptions);
    }

    async sendForgotMail(email: string, token: string) {
        const user = await this.userService.findByEmail(email);
        if (user != null){
            let mailContent = this._forgotMailTemplate;
            mailContent = mailContent.replace("@Prenom",user.prenom);
            mailContent = mailContent.replace("@Nom",user.nom);
            mailContent = mailContent.replace("@Prenom",user.prenom);
            const url = this._baseUrl+'account/password?token='+token;
            mailContent = mailContent.replace("@Link",url);
            mailContent = mailContent.replace("@Link",url);
            const mailOptions = {
                from: 'dev.loic.lecuyer@gmail.com', 
                to: email, 
                subject: 'Récupération de mot de passe', 
                html: mailContent,
            };
            await this.sendMail(mailOptions);
        }
        else
        {
            throw new Error('User not find');
        }

        
    }

    private async sendMail(mailOptions : any) : Promise<void> {
        return new Promise<void>((resolve,reject) =>{
            const transporter = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'dev.loic.lecuyer@gmail.com',
                    pass: '6gtoqpaptdQ'
                }
            });
            
            transporter.sendMail(mailOptions, function (err, info) {
                if(err){
                    console.log(err);
                    reject(err);

                }               
                else
                 { resolve();}
             });
        });
        
    }




}