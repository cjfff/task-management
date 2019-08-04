import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class VertifyEmailDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly token: string;
}