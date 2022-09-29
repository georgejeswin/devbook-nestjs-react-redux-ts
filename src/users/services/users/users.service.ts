import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from 'src/typeorm/entities/user.entity';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { User } from 'src/users/types';
import { encodePassword } from 'src/utils/bcrypt';
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

  async findUserById(id: string): Promise<User> {
    try {
      return this.userRepository.findOne({ where: { id } });
    } catch (error) {
      console.log('Find by id failed', error);
    }
  }

  async findUserByUsername(username: string): Promise<User> {
    try {
      return this.userRepository.findOne({ where: { username } });
    } catch (error) {
      console.log('Find by username failed', error);
    }
  }

  async createUser(user: CreateUserDto) {
    try {
      const password = encodePassword(user.password);
      const userExists = await this.findUserByUsername(user?.username);
      if (userExists) {
        throw new HttpException(
          `User ${user.username} already exists`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const newUser = await this.userRepository.create({ ...user, password });
      return this.userRepository.save(newUser);
    } catch (error) {
      console.log('Create user failed', error);
    }
  }

  async updateUser(id: string, updateUserDto: any): Promise<any> {
    return this.userRepository.update(id, updateUserDto);
  }
}
