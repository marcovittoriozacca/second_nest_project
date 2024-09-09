import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CheckPostOwner implements CanActivate {
  constructor(private prisma: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { postId } = request.params;
    const userId = request.user.id;

    try {
      const post = await this.prisma.post.findUnique({
        where: { id: request.params.postId },
        select: {
          id: true,
          authorId: true,
        },
      });

      if (!post) {
        throw new NotFoundException(
          `The element with id: ${postId} is missing`,
        );
      }
      if (post.authorId !== userId) {
        throw new ForbiddenException({
          statusCode: 403,
          message: 'You do not have permission to perform this action',
          error: 'Forbidden',
        });
      }
      return true;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2023') {
          throw new BadRequestException(
            `The id: ${postId} provided is wrong. Must be exactly 12 bytes`,
          );
        }
      }
      throw err;
    }
  }
}
