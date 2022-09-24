import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    name: 'title',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    name: 'description',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'text',
    name: 'image',
    nullable: true,
  })
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
