import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { RefreshTokenGuard } from 'src/auth/guards/refresh-token.gurard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServie: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authServie.loginUser(req.user);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authServie.signUpUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Request() req) {
    this.authServie.logout(req.user.sub);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshToken(@Request() req) {
    const userId = req.user.sub;
    const refreshToken = req.user.refreshToken;
    return this.authServie.refreshTokens(userId, refreshToken);
  }
}
