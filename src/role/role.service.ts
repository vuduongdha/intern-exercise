import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RoleService {
    constructor(private prisma: PrismaService) {}

    async createRole() {
        await this.prisma.role.createMany({
            data: [{ name: 'USER' }, { name: 'ADMIN' }, { name: 'GUEST' }],
        });
    }
}
