import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create() {
    // const user = await this.prisma.user;
      // console.log(user);
    // const user = await this.prisma.user.create({
      
    // });
  }
}
