import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @Get('/')
  async getAllPosts() {
    return;
  }

  @Get('/:postId')
  async getPostById() {
    return;
  }

  @Post('/create')
  async createNewPost() {
    return;
  }

  @Put('/:postId')
  async updatePost() {
    return;
  }

  @Delete('/:postId')
  async deletePost() {
    return;
  }
}
