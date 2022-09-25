import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'test title', description: ' title of post' })
  @IsNotEmpty()
  @MinLength(5)
  title: string;

  @ApiProperty({
    example: 'test description',
    description: 'description of post',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: 'test image', description: 'description of image' })
  @IsString()
  image: string;
}
