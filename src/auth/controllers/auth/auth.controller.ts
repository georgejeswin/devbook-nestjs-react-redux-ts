import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServie: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return req.user;
  }

  @Post('/signup')
  async signup(@Body() user: CreateUserDto) {
    return this.authServie.signUpUser(user);
  }
}
