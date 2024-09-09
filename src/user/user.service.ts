import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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

      if (!user) {
        throw new NotFoundException(`The user with id: ${id} doesn't exist`);
      }
      return user;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2015') {
          throw new NotFoundException({
            message: `The user with id: ${id} doesn't exist`,
            statusCode: HttpStatus.NOT_FOUND,
          });
        }
        if (err.code === 'P2023') {
          throw new BadRequestException({
            message: `${id} is not a valid id - provide a 12 byte string`,
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }
      }
      console.error(err);
      throw err;
    }
  }
}
