import { Injectable, InternalServerErrorException, Req } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto';
import { AllPostsInterface } from './interface';

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

  async getPostById(): Promise<Post> {
    //this is only an example of the returned value - not finished
    //@ts-ignore
    return { id: 1 };
  }

  async createNewPost(dto: CreatePostDto, id: string): Promise<Post> {
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

    return;
  }

  async updatePost(): Promise<Post> {
    //this is only an example of the returned value - not finished
    //@ts-ignore
    return { updated_post: true };
  }

  async deletePost(): Promise<{ success: boolean }> {
    //this is only an example of the returned value - not finished
    //@ts-ignore
    return { success: true };
  }
}
