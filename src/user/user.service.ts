import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDTO } from './dto';
import { format } from 'date-fns';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async update() {
    const updateUser = await this.prismaService.user.update({
      where: {
        email: 'viola@prisma.io',
      },
      data: {
        firstName: 'Mai Duc Chuong',
      },
    });
  }
  async searchUsersByFirstName(firstName: string) {
    const users = await this.prismaService.user.findMany({
      where: {
        firstName: {
          contains: firstName,
        },
      },
    });
    console.log(firstName);

    return users;
  }
  async searchUsersByLastName(lastName: string) {
    const users = await this.prismaService.user.findMany({
      where: {
        lastName: {
          contains: lastName,
        },
      },
    });
    console.log(lastName);

    return users;
  }
  async searchUsersByEmail(email: string) {
    const users = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    console.log(email);

    return users;
  }
  async deleteByEmail(email: string) {
    const deleteUser = await this.prismaService.user.delete({
      where: {
        email,
      },
    });
    return deleteUser;
  }
}
