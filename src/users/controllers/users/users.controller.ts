import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers() {
    const users = await this.usersService.findAllUsers();
    if (users) return users;
    else throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getMe(@Request() req) {
    return req.user;
  }
}
