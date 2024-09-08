import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/guard';

@Controller('posts')
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

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createNewPost() {
    return;
  }
  //must add a guards that checks the token and checks if the post is associated with the user or not
  @UseGuards(JwtAuthGuard)
  @Put('/:postId')
  async updatePost() {
    return;
  }

  //must add a guards that checks the token and checks if the post is associated with the user or not
  @Delete('/:postId')
  async deletePost() {
    return;
  }
}
