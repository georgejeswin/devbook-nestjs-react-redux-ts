import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'test123', description: 'username of user' })
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @ApiProperty({ example: 'test@mail.com', description: 'mail of user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password', description: 'password of user' })
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @ApiProperty({ example: 'test', description: 'first name of user' })
  @IsNotEmpty()
  @MinLength(2)
  firstName: string;

  @ApiProperty({ example: 'test', description: 'last name of user' })
  @IsString()
  lastName: string;

  refresh_token: string;
}
