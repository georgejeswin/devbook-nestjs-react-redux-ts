import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findUserByUsername(username);
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }
}
