import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as express from 'express';
import {JwtMiddleware} from './portal/middlewares/jwt.middleware';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(JwtMiddleware);
  app.use(express.static('..\\..\\portal\\front\\dist\\ceuillette'));
  await app.listen(4000);

}
bootstrap();
