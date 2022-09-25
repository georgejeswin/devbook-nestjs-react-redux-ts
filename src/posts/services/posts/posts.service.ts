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
      return this.postRepository.find({
        relations: {
          user: true,
        },
      });
    } catch (error) {
      console.log('Get All Posts Error: ', error);
    }
  }

  async createPost(createPostDto: any) {
    try {
      const post = await this.postRepository.create(createPostDto);
      return this.postRepository.save(post);
    } catch (error) {
      console.log('Create Post Error: ', error);
    }
  }
}
