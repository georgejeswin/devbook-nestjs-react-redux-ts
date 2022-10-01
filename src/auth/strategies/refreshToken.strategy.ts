import { Injectable, Request } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('refresh_token'),
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }
  validate(@Request() req, payload: any) {
    // const refreshToken = req.headers.authorization.replace('Bearer', '').trim();
    const refreshToken = req.headers.refresh_token;
    return { ...payload, refreshToken };
  }
}
