import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'test123', description: 'username of user' })
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @ApiProperty({ example: 'password', description: 'password of user' })
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
