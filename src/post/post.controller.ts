import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('post')
export class PostController {
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
