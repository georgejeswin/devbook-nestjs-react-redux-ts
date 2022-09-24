import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/post.entity';
import { PostsController } from './controllers/posts/posts.controller';
import { PostsService } from './services/posts/posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
