import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { PostsService } from 'src/posts/services/posts/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
  @Get()
  async getAllPosts() {
    const posts = await this.postsService.getAllPosts();
    if (posts) return posts;
    else {
      throw new HttpException('No posts found', HttpStatus.NOT_FOUND);
    }
  }
}
