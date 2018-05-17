import { createConnection, Connection } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class DatabaseService {
  constructor() {}

  async getConnection(): Promise<Connection> {
    return await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Emash21',
      database: 'Ceuilette',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    });
  }
}
