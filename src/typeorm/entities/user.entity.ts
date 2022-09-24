import { ApiProperty } from '@nestjs/swagger';
import { UserType } from 'src/users/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'Id for user' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'test123', description: 'username of user' })
  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  username: string;

  @ApiProperty({ example: 'test@mail.com', description: 'mail of user' })
  @Column({
    nullable: false,
    default: '',
  })
  email: string;

  @ApiProperty({ example: 'test', description: 'first name of user' })
  @Column({
    type: 'text',
    nullable: false,
  })
  firstName: string;

  @ApiProperty({ example: 'test', description: 'last name of user' })
  @Column({
    type: 'text',
    nullable: true,
  })
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserType,
    nullable: false,
    default: 'user',
  })
  userType: UserType;
}
