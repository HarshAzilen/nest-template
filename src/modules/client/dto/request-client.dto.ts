import { IsOptional } from 'class-validator';

export class CreateClientDto {
  @IsOptional()
  clientId: string;

  @IsOptional()
  secret: string;

  @IsOptional()
  email: string;

  @IsOptional()
  password: string;

  @IsOptional()
  refreshToken: string;
}

export class UpdateClientDto {
  @IsOptional()
  readonly clientId: string;

  @IsOptional()
  readonly secret: string;

  @IsOptional()
  readonly refreshToken: string;
}
