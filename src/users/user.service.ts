import { Injectable } from '@nestjs/common';
import { Gender, PrismaClient, Status, User } from '@prisma/client';
import { UserDto } from './user.dto';
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class UserService {

    async addUser(createUserDto: UserDto, roles: number[]): Promise<User> {
        const uuid = uuidv4();
        let newGenderValue: Gender = Gender.TBD;
        if (createUserDto.gender) {
            if (createUserDto.gender.trim().toUpperCase() == Gender.FEMALE) {
                newGenderValue = Gender.FEMALE;
            } else if (createUserDto.gender.trim().toUpperCase() == Gender.MALE) {
                newGenderValue = Gender.MALE;
            }
        }

        let newStatusValue: Status = Status.INACTIVE;
        if (createUserDto.status) {
            if (createUserDto.status.trim().toUpperCase() == Status.ACTIVE) {
                newStatusValue = Status.ACTIVE;
            }
        }

        const user = await prisma.user.create({
            data: {
                id: uuid.toString(),
                firstName: createUserDto.firstName,
                lastName: createUserDto.lastName,
                address: createUserDto.address,
                dateOfBirth: createUserDto.dateOfBirth,
                email: createUserDto.email,
                isEmailVerified: createUserDto.isEmailVerified,
                phone: createUserDto.phone,
                gender: newGenderValue,
                status: newStatusValue,
                roles: {
                    connect: roles.map((id) => ({
                        id: id,
                    })),
                },
            },
        })
        console.log(user);
        return user;
    }

    async getAllUsers() {
        return prisma.user.findMany();
    }

    async deleteUser(userId: string) {
        const deletedUser = await prisma.user.delete({
            where: {
                id: userId
            }
        });
        return [deletedUser.firstName, 'is deleted'].join(' ');
    }

    isEnumField = (field: string): boolean => {
        return field === 'status' || field === 'gender';
    }

    async getUsers(field: string, value: string | boolean) {
        if (this.isEnumField(field) && (typeof value === 'string')) {
            return this.filterUsers(field, value);
        }
        const users = await prisma.user.findMany({
            where: {
                [field]: value
            }
        });
        return users;
    }

    async filterUsers(field: string, value: string) {
        let convertedValue = value;
        switch (field) {
            case 'status': {
                convertedValue = Status[value.trim().toUpperCase()];
                break;
            }
            case 'gender': {
                convertedValue = Gender[value.trim().toUpperCase()];
                break;
            }
        }

        const users = await prisma.user.findMany({
            where: {
                [field]: convertedValue
            }
        });
        return users;
    }

    async sortUsers(field: string) {
        const users = await prisma.user.findMany({
            orderBy: [
                {
                    [field]: 'asc',
                }
            ]
        });
        return users;
    }

    async updateUser(id: string, updatedData: object) {
        console.log('updatedData: ', updatedData);
        const updateUser = await prisma.user.update({
            where: {
                id: id,
            },
            data: updatedData
        })
        console.log(updateUser);
        return updateUser;
    }
}