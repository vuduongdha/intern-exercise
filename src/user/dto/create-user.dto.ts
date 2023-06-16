import { Gender } from '@prisma/client';
import {
    IsDateString,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    Length,
} from 'class-validator';

export class UserDTO {
    @IsNotEmpty({ message: 'First name cannot be empty' })
    @Length(2, 50, {
        message: 'First name must be between 2 and 50 characters',
    })
    firstName: string;

    @IsNotEmpty({ message: 'Last name cannot be empty' })
    @Length(2, 50, { message: 'Last name must be between 2 and 50 characters' })
    lastName: string;

    @IsNotEmpty({ message: 'Date cannot be empty' })
    @IsDateString()
    dateOfBirth: Date;

    @IsNotEmpty({ message: 'Address cannot be empty' })
    @Length(1, 255, { message: 'Address must be between 1 and 255 characters' })
    address: string;

    @IsNotEmpty({ message: 'Email cannot be empty' })
    @IsEmail({}, { message: 'Email is not valid' })
    email: string;

    @IsNotEmpty({ message: 'Phone number cannot be empty' })
    @Length(10, 20, {
        message: 'Phone number must be between 10 and 20 characters',
    })
    phoneNumber: string;

    @IsNotEmpty({ message: 'Gender cannot be empty' })
    @IsEnum(Gender, { message: 'Please type correct gender!' })
    gender: string;
}
