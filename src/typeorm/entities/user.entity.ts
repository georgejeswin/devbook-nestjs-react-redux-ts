import { UserType } from 'src/users/types';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  firstName: string;

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

  @Column({
    type: 'text',
    nullable: true,
    default: '',
  })
  refresh_token: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
