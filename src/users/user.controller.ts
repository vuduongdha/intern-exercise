import { Controller, Get, Post, Body, Patch, Param, Put, Delete } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/add')
  addUser(
    @Body('user') createUserDto: UserDto,
    @Body('roles') roleIds: number[]
  ): Promise<User> {
    return this.userService.addUser(createUserDto, roleIds);
  }

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Get('/search')
  getUsers(
    @Body('firstName') firstName?: string,
    @Body('lastName') lastName?: string,
    @Body('email') email?: string,
    @Body('status') status?: string,
    @Body('gender') gender?: string,
    @Body('isEmailVerified') isEmailVerified?: boolean,
  ) {
    if (firstName && typeof firstName === 'string') {
      return this.userService.getUsers('firstName', firstName);
    }
    if (lastName && typeof lastName === 'string') {
      return this.userService.getUsers('lastName', lastName);
    }
    if (email && typeof email === 'string') {
      return this.userService.getUsers('email', email);
    }
    if (isEmailVerified && typeof isEmailVerified === 'boolean') {
      return this.userService.getUsers('isEmailVerified', isEmailVerified);
    }
    if (status && typeof status === 'string') {
      return this.userService.getUsers('status', status);
    }
    if (gender && typeof gender === 'string') {
      return this.userService.getUsers('gender', gender);
    }
    return { message: "Please enter a valid value for the field" };
  }

  @Get('/sort/:field')
  sortUsers(@Param('field') field: string) {
    return this.userService.sortUsers(field.trim());
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() data
  ) {
    return this.userService.updateUser(id, data)
  }

  @Delete('/:id')
  removeProduct(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
