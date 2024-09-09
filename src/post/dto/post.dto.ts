import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  title: string;

  @IsOptional()
  @IsString()
  @Length(40, 1000)
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
