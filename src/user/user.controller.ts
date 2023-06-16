import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create-new-user')
  create(@Body() body: any) {
    // body type must be a "Data Transfer Object" - DTO
    console.log(body);
    return this.userService.create();
  }
}
