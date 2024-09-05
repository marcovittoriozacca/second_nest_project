import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get('/')
  getAllUsers() {
    return [{ user: 1 }, { user: 2 }, { user: 3 }];
  }
}
