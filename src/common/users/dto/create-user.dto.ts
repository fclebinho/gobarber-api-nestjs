import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  sub: string;

  name?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
