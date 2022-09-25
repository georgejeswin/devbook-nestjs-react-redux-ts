import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { User } from 'src/users/types';
import { comparePassword } from 'src/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

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

  async generateAccessToken(payload: any) {
    return this.jwtService.sign(payload);
  }

  async loginUser(user: User): Promise<any> {
    try {
      const payload = { username: user.username, sub: user.id };
      const token = await this.generateAccessToken(payload);
      return {
        access_token: token,
        user: user,
      };
    } catch (error) {
      console.log('Error login user: ', error);
      return null;
    }
  }
}
