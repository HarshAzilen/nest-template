import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsEmail()
  readonly email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  readonly password!: string;
}

export interface ICredentials {
  version: number;
  lastPassword: string;
  passwordUpdatedAt: number;
  updatedAt: number;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  confirmed: boolean;
  credentials: ICredentials;
  createdAt: Date;
  updatedAt: Date;
}
