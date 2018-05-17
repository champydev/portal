


import { createConnection, Connection } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import {DatabaseService} from '../services/database.service';
@Injectable()
export class UserService {
  constructor(private databaseService : DatabaseService) {
   // this.photoRepository = this.databaseService.getConnection()
  }

  private readonly photoRepository: Repository<User>;

  
  
}
