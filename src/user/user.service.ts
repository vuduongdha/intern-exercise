import { Injectable } from '@nestjs/common';
import { Gender, Status } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { FilterDTO } from './dto/create-filter.dto';
import { SearchDTO } from './dto/create-search.dto';
import { SortDTO } from './dto/create-sort.dto';
import { UserDTO } from './dto/create-user.dto';
import { UpdateDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async createUser(user: UserDTO) {
        const userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: new Date(user.dateOfBirth),
            address: user.address,
            email: user.email,
            phoneNumber: user.phoneNumber,
            gender: <Gender>user.gender,
        };
        await this.prisma.user.create({
            data: userData,
        });
    }
    async createUserWithRoles(userId: string, roles: string[]) {
        const data = roles.map((roleId) => {
            return {
                userId: userId,
                roleId: roleId,
            };
        });
        await this.prisma.userRole.createMany({
            data: data,
        });
    }
    async getListUserWithParams(
        searchData: SearchDTO,
        filterData: FilterDTO,
        sortType: SortDTO,
    ) {
        const { firstName, lastName, email } = searchData;
        const { status, gender, emailVerified } = filterData;
        const sortTypeKey = Object.keys(sortType).find(
            (key) => sortType[key] == true,
        );
        if (
            !firstName &&
            !lastName &&
            !email &&
            !status &&
            !gender &&
            !emailVerified
        )
            return;
        const result = await this.prisma.user.findMany({
            where: {
                firstName: {
                    contains: firstName,
                    mode: 'insensitive',
                },
                lastName: {
                    contains: lastName,
                    mode: 'insensitive',
                },
                email: {
                    contains: email,
                    mode: 'insensitive',
                },
                status: <Status>status,
                gender: <Gender>gender,
                isEmailVerified: emailVerified,
            },
            orderBy: {
                [sortTypeKey]: 'asc',
            },
        });
        return result;
    }
    async updateUser(userId: string, userData: UpdateDTO) {
        const { firstName, lastName } = userData;
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                firstName,
                lastName,
            },
        });
    }
    async deleteUser(userId: string) {
        await this.prisma.user.delete({
            where: {
                id: userId,
            },
        });
    }
}
