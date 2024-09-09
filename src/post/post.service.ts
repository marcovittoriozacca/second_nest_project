import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto';
import { AllPostsInterface } from './interface';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getAllPosts(): Promise<AllPostsInterface[]> {
    try {
      return await this.prisma.post.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          image: true,
          createdAt: true,
          authorId: true,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async getPostById(id: string): Promise<Partial<Post>> {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id },
      });
      delete post.updatedAt;
      return post;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException(`The element with id: ${id} is missing`);
        }
        if (err.code === 'P2023') {
          throw new BadRequestException(
            `The id: ${id} provided is wrong. Must be exactly 12 bytes`,
          );
        }
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async createNewPost(dto: PostDto, id: string): Promise<Post> {
    console.log(id);
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: {
          post: {
            create: [{ ...dto }],
          },
        },
        include: {
          post: true,
        },
      });

      return user.post[user.post.length - 1];
    } catch (err) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async updatePost(dto: PostDto, id: string): Promise<Post> {
    try {
      const updatedPost = this.prisma.post.update({
        where: { id },
        data: dto,
      });
      return updatedPost;
    } catch (err) {
      throw err;
    }
  }

  async deletePost(id: string): Promise<{ success: boolean }> {
    try {
      await this.prisma.post.delete({
        where: { id },
      });

      return { success: true };
    } catch (err) {
      throw err;
    }
  }
}
