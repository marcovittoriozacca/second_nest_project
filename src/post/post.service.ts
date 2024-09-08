import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getAllPosts(): Promise<Post[]> {
    //this is only an example of the returned value - not finished
    //@ts-ignore
    return [{ id: 1 }, { id: 2 }, { id: 3 }];
  }

  async getPostById(): Promise<Post> {
    //this is only an example of the returned value - not finished
    //@ts-ignore
    return [{ id: 1 }];
  }

  async createNewPost(): Promise<Post> {
    //this is only an example of the returned value - not finished
    //@ts-ignore
    return [{ new_post: true }];
  }

  async updatePost(): Promise<Post> {
    //this is only an example of the returned value - not finished
    //@ts-ignore
    return [{ updated_post: true }];
  }

  async deletePost(): Promise<{ success: boolean }> {
    //this is only an example of the returned value - not finished
    //@ts-ignore
    return { success: true };
  }
}
