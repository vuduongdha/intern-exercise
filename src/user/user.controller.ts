import { Controller, Post, Req, Body, Get, Param } from '@nestjs/common';
import { UserDTO } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('user-update')
  update(@Body() body: UserDTO) {
    console.log(body);

    return this.userService.update();
  }

  @Get('search/:firstName')
  searchUsersByFirstName(
    @Param('firstName') firstName: string,
    @Body() body: UserDTO,
  ) {
    console.log(body);

    return this.userService.searchUsersByFirstName(firstName);
  }
  @Get('search/:lastName')
  searchUsersByLastName(
    @Param('lastName') lastName: string,
    @Body() body: UserDTO,
  ) {
    console.log(body);

    return this.userService.searchUsersByFirstName(lastName);
  }
  @Get('search/:email')
  searchUsersByEmail(@Param('email') email: string, @Body() body: UserDTO) {
    console.log(body);

    return this.userService.searchUsersByFirstName(email);
  }
  @Post('delete/:email')
  deleteByEmail(@Param('email') email: string, @Body() body: UserDTO) {
    return this.userService.deleteByEmail(email);
  }
}
