import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePostDto } from 'src/posts/dtos/createPost.dto';
import { PostsService } from 'src/posts/services/posts/posts.service';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private userService: UsersService,
  ) {}

  @Get()
  async getAllPosts() {
    const posts = await this.postsService.getAllPosts();
    if (posts) return posts;
    else {
      throw new HttpException('No posts found', HttpStatus.NOT_FOUND);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/create')
  async createPost(@Body() createPostDto: CreatePostDto) {
    const user = await this.userService.findUserByUsername('test1');
    const post = await this.postsService.createPost({
      ...createPostDto,
      user,
    });
    if (post) return post;
    else return null;
  }
}
