import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from 'src/typeorm/entities/user.entity';
import { User } from 'src/users/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async findAllUsers() {
    try {
      return this.userRepository.find();
    } catch (error) {
      console.log('Find all users failed', error);
    }
  }
  async findUserByUsername(username: string): Promise<User> {
    try {
      return this.userRepository.findOne({ where: { username } });
    } catch (error) {
      console.log('Find by username failed', error);
    }
  }
}
