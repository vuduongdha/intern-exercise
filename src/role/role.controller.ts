import { Controller, Post } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post('/create')
    createRole() {
        return this.roleService.createRole();
    }
}
