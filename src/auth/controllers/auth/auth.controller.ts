import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServie: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
