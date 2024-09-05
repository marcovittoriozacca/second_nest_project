import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P6100')
          throw new InternalServerErrorException({
            message: 'Internal Server Error',
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          });
        if (err.code === 'P6101')
          throw new ServiceUnavailableException({
            message: 'Service Unavailable',
            statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          });
      }
      throw err;
    }
  }

  async getSingleUser(id: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      return user;
    } catch (err) {
      throw err;
    }
  }
}
