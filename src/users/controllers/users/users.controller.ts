import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async getAllUsers() {
    const users = await this.usersService.findAllUsers();
    if (users) return users;
    else throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
  }
}
