import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
@Module({})
export class PortalModule {
    controllers: [AccountController]
}
