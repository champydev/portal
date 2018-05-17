import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PortalModule } from './portal/portal.module';
import {AccountController} from './portal/controllers/account.controller';
@Module({
  imports: [PortalModule],
  controllers: [AppController,AccountController],
  providers: [ AppService ],
  exports:[PortalModule]
})
export class AppModule {}
