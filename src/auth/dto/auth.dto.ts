import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
