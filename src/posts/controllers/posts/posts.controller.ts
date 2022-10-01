import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { omit } from 'lodash';
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

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPosts() {
    const posts = await this.postsService.getAllPosts();
    if (posts) return posts.reverse();
    else {
      throw new HttpException('No posts found', HttpStatus.NOT_FOUND);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  // @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('create')
  async createPost(
    @Request() req,
    @Body() createPostDto: CreatePostDto,
    // @UploadedFile() file: Express.Multer.File,
  ) {
    const user = await this.userService.findUserByUsername(req?.user?.username);
    const image = await this.postsService.uploadImageToCloudinary(
      createPostDto.image,
    );
    const serializedUser = omit(user, ['password']);
    const post = await this.postsService.createPost({
      ...createPostDto,
      user: serializedUser,
      image: image.url,
    });
    if (post) return post;
    else return null;
  }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('image'))
  // uploadImage(@UploadedFile() file: Express.Multer.File) {
  //   return this.postsService.uploadImageToCloudinary(file);
  // }
}
