import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {

  @IsString()
  @IsNotEmpty()
  username: string;

  @MinLength(6)
  password: string;
}