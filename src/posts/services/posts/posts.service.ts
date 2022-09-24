import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post as PostEntity } from 'src/typeorm/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}
  async getAllPosts() {
    try {
      return this.postRepository.find();
    } catch (error) {
      console.log('Get All Posts Error: ', error);
    }
  }
}
