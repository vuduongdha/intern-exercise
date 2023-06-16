import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { FilterDTO } from './dto/create-filter.dto';
import { SearchDTO } from './dto/create-search.dto';
import { SortDTO } from './dto/create-sort.dto';
import { UserDTO } from './dto/create-user.dto';
import { UpdateDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    createUser(@Body() user: UserDTO) {
        return this.userService.createUser(user);
    }

    @Post('role/create/:userId')
    createUserWithRoles(
        @Param('userId') userId: string,
        @Body('roles') roles: string[],
    ) {
        return this.userService.createUserWithRoles(userId, roles);
    }

    @Get()
    getListUserWithParams(
        @Body('search') searchData: SearchDTO,
        @Body('filter') filterData: FilterDTO,
        @Body('sortBy') sortType: SortDTO,
    ) {
        return this.userService.getListUserWithParams(
            searchData,
            filterData,
            sortType,
        );
    }

    @Patch('update/:userId')
    updateUser(@Param('userId') userId: string, @Body() updateDTO: UpdateDTO) {
        return this.userService.updateUser(userId, updateDTO);
    }

    @Delete('delete/:userId')
    deleteUser(@Param('userId') userId: string) {
        return this.userService.deleteUser(userId);
    }
}
