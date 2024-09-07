import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { IsFieldUnique } from '../decorator';

class Fullname {
  @IsOptional()
  @IsString()
  @Length(3, 15)
  firstname?: string;

  @IsOptional()
  @IsString()
  @Length(3, 15)
  lastname?: string;
}

export class SignupDto {
  @IsOptional()
  fullname?: Fullname;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @IsFieldUnique('username', 'user')
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @IsFieldUnique('email', 'user')
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
}
