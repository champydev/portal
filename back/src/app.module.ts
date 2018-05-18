import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PortalModule } from './portal/portal.module';
import {AccountController} from './portal/controllers/account.controller';
import {AccountService} from './portal/services/account.service';
import {UserService} from './portal/services/user.service';
import {DatabaseService} from './portal/services/database.service';

@Module({
  imports: [PortalModule],
  controllers: [AppController],
  providers: [ AppService ],
  exports:[PortalModule]
})
export class AppModule {

 
}
