


import { createConnection, Connection } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { DatabaseService } from '../services/database.service';
@Injectable()
export class UserService {
  private _userRepository: Repository<User> = null;
  constructor(private databaseService: DatabaseService) {
  }

  async getUserRepository(): Promise<Repository<User>> {
    if (this._userRepository === null) {
      const connection = await this.databaseService.getConnection();
 
      this._userRepository = await connection.getRepository(User);
    }
    return this._userRepository;
  }

  async findById(id: string): Promise<User> {
    const repository = await this.getUserRepository();
    return await repository.findOne(id);
  }
  async findByEmail(email: string): Promise<User> {
    const repository = await this.getUserRepository();
    const user =  await repository.findOne({
      where: {
        email: email
      }
    });    
    return user;
  }




}
