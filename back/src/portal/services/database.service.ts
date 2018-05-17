import { createConnection, Connection } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class DatabaseService {
  private _connection : Connection = null;
  constructor() {}

  async getConnection(): Promise<Connection> {
    if (this._connection === null){
      this._connection= await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Emash21',
        database: 'Ceuillette',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });
    }
    return this._connection;
    
  }
}
