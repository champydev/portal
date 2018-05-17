import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PortalModule } from './portal/portal.module';
import {AccountController} from './portal/controllers/account.controller';
import {AccountService} from './portal/services/account.service';
@Module({
  imports: [PortalModule],
  controllers: [AppController,AccountController],
  providers: [ AppService,AccountService ],
  exports:[PortalModule]
})
export class AppModule {}
