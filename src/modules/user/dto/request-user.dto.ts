import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  readonly firstName: string;

  @IsOptional()
  readonly lastName: string;

  @IsOptional()
  readonly email: string;

  @IsOptional()
  readonly password?: string;

  @IsOptional()
  phone_no?: number;

  @IsOptional()
  roleId?: string;

  @IsOptional()
  venueName?: string;
}

export class LocationOperatorDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  email: string;

  @IsOptional()
  phoneNo: string;

  @IsOptional()
  roleId?: string;
  @IsNotEmpty()
  addedBy: string;
}

export class ResetPasswordDto {
  @IsOptional()
  readonly password: string;

  @IsOptional()
  readonly confirmPassword: string;

  @IsOptional()
  readonly email: string;
}

export class forgotPasswordDto {
  @IsOptional()
  readonly email: string;
}

export class OtpRequestDto {
  @IsOptional()
  readonly otp: string;

  @IsOptional()
  readonly email: string;
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
