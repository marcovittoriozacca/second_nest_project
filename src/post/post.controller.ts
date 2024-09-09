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
import { CreatePostDto } from './dto';
import { Request } from 'express';
import { AllPostsInterface } from './interface';
import { Post as PostCollection } from '@prisma/client';

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
    @Body() dto: CreatePostDto,
  ): Promise<PostCollection> {
    const { id } = req.user as { id: string };
    return this.postService.createNewPost(dto, id);
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
