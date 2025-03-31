import {
  IsEmail,
  IsNumber,
  IsString,
  MinLength,
  IsNotEmpty,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
