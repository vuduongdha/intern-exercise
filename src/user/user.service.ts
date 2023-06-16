import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Gender, Prisma, Status } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const { roles, ...userData } = createUserDto;
    const isEmailExisted = await this.prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });
    if (isEmailExisted) {
      throw new BadRequestException('This email already exists');
    }
    const roleData = await this.prisma.role.findMany({
      where: {
        name: {
          in: roles,
        },
      },
    });
    const userInput = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      dateOfBirth: new Date(userData.dateOfBirth),
      isEmailVerified: userData.isEmailVerified,
      gender: <Gender>userData.gender,
      status: <Status>userData.status,
      phoneNumber: userData.phoneNumber,
    };
    const roleInput = roleData.map((role) => {
      return {
        role: {
          connect: {
            id: role.id,
          },
        },
      };
    });
    const user = await this.prisma.user.create({
      data: {
        ...userInput,
        roles: {
          create: roleInput,
        },
      },
    });

    return user;
  }

  findAll() {
    return `This action returns all user`;
  }
  async users(
    search: string = '',
    filter?: {
      status?: Status;
      gender?: Gender;
      isEmailVerified?: boolean;
    },
    sortBy: string = 'firstName',
  ) {
    console.log(sortBy);
    return this.prisma.user.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: search,
            },
          },
          {
            lastName: {
              contains: search,
            },
          },
          {
            email: {
              contains: search,
            },
          },
        ],
        ...filter,
      },
      orderBy: {
        [sortBy]: 'asc',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { firstName, lastName, gender, status } = updateUserDto;
    const result = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        gender: <Gender>gender,
        status: <Status>status,
      },
    });
    return result;
  }

  async remove(id: string) {
    const result = this.prisma.user.delete({
      where: {
        id,
      },
    });
    return result;
  }
}
