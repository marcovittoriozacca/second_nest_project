import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/guard';
import { Request } from 'express';
import { AllPostsInterface } from './interface';
import { Post as PostCollection } from '@prisma/client';
import { CheckPostOwner } from './guard';
import { PostDto } from './dto';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}
  @Get('/')
  async getAllPosts(): Promise<AllPostsInterface[]> {
    return this.postService.getAllPosts();
  }

  @Get('/:postId')
  async getPostById(
    @Param('postId') id: string,
  ): Promise<Partial<PostCollection>> {
    return this.postService.getPostById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createNewPost(
    @Req() req: Request,
    @Body() dto: PostDto,
  ): Promise<PostCollection> {
    const { id } = req.user as { id: string };
    return this.postService.createNewPost(dto, id);
  }
  //must add a guards that checks the token and checks if the post is associated with the user or not
  @UseGuards(JwtAuthGuard, CheckPostOwner)
  @Put('/:postId')
  async updatePost(@Param('postId') id: string, @Body() dto: PostDto) {
    return this.postService.updatePost(dto, id);
  }

  //must add a guards that checks the token and checks if the post is associated with the user or not
  @UseGuards(JwtAuthGuard, CheckPostOwner)
  @Delete('/:postId')
  async deletePost(@Param('postId') id: string): Promise<{ success: boolean }> {
    return this.postService.deletePost(id);
  }
}
