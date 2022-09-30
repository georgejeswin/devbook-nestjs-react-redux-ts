import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { User } from 'src/users/types';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// import { omit } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
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
  async signUpUser(
    user: CreateUserDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    try {
      const createdUser = await this.userService.createUser(user);
      if (createdUser) {
        // const serializedUser = omit(createdUser, ['password']);
        const token = await this.getTokens(
          createdUser.id,
          createdUser.username,
        );
        await this.updateRefreshToken(createdUser.id, token.refresh_token);
        return {
          access_token: token.access_token,
          refresh_token: token.refresh_token,
        };
      }
    } catch (error) {
      console.log('Error signup user: ', error);
    }
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = encodePassword(refreshToken);
    await this.userService.updateUser(userId, {
      refresh_token: hashedRefreshToken,
    });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findUserById(userId);
    if (!user || !user.refresh_token)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = comparePassword(
      refreshToken,
      user?.refresh_token,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async getTokens(userId: string, username: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '10s',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  async loginUser(
    user: User,
  ): Promise<{ access_token: string; refresh_token: string }> {
    try {
      // const serializedUser = omit(user, ['password']);
      const token = await this.getTokens(user.id, user.username);
      return {
        access_token: token.access_token,
        refresh_token: token.refresh_token,
      };
    } catch (error) {
      console.log('Error login user: ', error);
      return null;
    }
  }

  async logout(userId: string) {
    this.userService.updateUser(userId, { refreshToken: null });
  }
}
