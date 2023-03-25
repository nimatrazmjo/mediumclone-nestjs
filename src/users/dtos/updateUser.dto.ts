import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly bio: string;

  @IsString()
  image: string;
}