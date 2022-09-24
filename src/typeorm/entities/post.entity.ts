import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Post {
  @ApiProperty({ example: 1, description: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'test title', description: ' title of post' })
  @Column({
    type: 'text',
    name: 'title',
    nullable: false,
  })
  title: string;

  @ApiProperty({
    example: 'test description',
    description: 'description of post',
  })
  @Column({
    type: 'text',
    name: 'description',
    nullable: true,
  })
  description: string;

  @ApiProperty({ example: 'test image', description: 'description of image' })
  @Column({
    type: 'text',
    name: 'image',
    nullable: true,
  })
  image: string;

  @ApiProperty({
    example: 'Date',
    description: 'Date of post creation',
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    example: 'Date',
    description: 'Date of post updation',
  })
  @UpdateDateColumn()
  updated_at: Date;
}
