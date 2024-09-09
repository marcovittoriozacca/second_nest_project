import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('/:id')
  async getSingleUser(@Param('id') id: string): Promise<User> {
    return this.userService.getSingleUser(id);
  }
}
