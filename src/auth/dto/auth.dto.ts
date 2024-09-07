import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

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
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @IsOptional()
  post?: [];
}
