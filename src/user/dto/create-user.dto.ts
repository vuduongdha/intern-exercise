import { Gender, Status } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  isEnum,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsArray()
  @ArrayMinSize(1)
  roles: string[];
  @IsEnum(Gender)
  gender: string;
  @IsEnum(Status)
  status: string;
  @IsBoolean()
  isEmailVerified: boolean;
  @Length(10, 10, { message: 'Phone number must have 10 letters in length' })
  phoneNumber: string;
  @IsDateString()
  dateOfBirth: string;
}
