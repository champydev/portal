import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { databaseProviders } from './providers/database.provider';
import { userProviders } from './providers/user.provider';
import {AccountService} from './services/account.service';
@Module({})
export class PortalModule {
    providers: [databaseProviders,userProviders,AccountService];
    exports: [databaseProviders,userProviders,AccountService];
    controllers: [AccountController];
 
}
