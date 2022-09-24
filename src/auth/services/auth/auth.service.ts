import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { User } from 'src/users/types';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findUserByUsername(username);
      if (user) {
        const decodedPassword = comparePassword(password, user?.password);
        if (decodedPassword) return user;
        return null;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }
  async signUpUser(user: CreateUserDto): Promise<User> {
    try {
      return this.userService.createUser(user);
    } catch (error) {
      console.log('Error signup user: ', error);
    }
  }
}
