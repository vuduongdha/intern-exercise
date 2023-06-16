import { Role } from '@prisma/client';
import { IsDate, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    firstName: string;
    @IsNotEmpty()
    lastName: string;
    @IsNotEmpty()
    address: string;
    @IsDate()
    dateOfBirth: Date;
    @IsEmail()
    email: string;
    @IsNotEmpty()
    isEmailVerified: boolean;
    @IsNumber()
    phone: string;
    @IsNotEmpty()
    gender: string;
    @IsNotEmpty()
    status: string;
}