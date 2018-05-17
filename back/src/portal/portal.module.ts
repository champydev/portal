import { Module,Global } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { DatabaseService } from './services/database.service';
import { UserService } from './services/user.service';
import {AccountService} from './services/account.service';
import {MailService} from './services/mail.service';

@Module({
    providers: [DatabaseService,UserService,AccountService,MailService],
    exports: [DatabaseService,UserService,AccountService,MailService],
    controllers: [AccountController],
})
export class PortalModule {
   
 
}
