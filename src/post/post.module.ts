import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { CheckPostOwner } from './guard';

@Module({
  providers: [PostService, CheckPostOwner],
  controllers: [PostController],
})
export class PostModule {}
