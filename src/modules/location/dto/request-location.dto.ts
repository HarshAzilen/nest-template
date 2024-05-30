import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SubscriptionStatus } from '../constants/subscription-status.enum';

export class CreateLocationDto {
  name: string;
  description?: string;
  sub_status?: SubscriptionStatus;
  sub_start_date?: Date;
  sub_end_date?: Date;
  media_id?: string;
  venue_operator_id: string;
  location_operator_id: string;
  subscription_id?: string;
}

export class UpdateLocationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class contactDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  phoneNo: string;
}

export class socialMediaDto {
  @IsNotEmpty()
  @IsString()
  facebook: string;

  @IsNotEmpty()
  @IsString()
  instagram: string;

  @IsNotEmpty()
  @IsString()
  other: string;

  @IsNotEmpty()
  @IsString()
  website: string;
}
export class LocationDto {
  @IsNotEmpty()
  venue_operator_id: string;

  @IsNotEmpty()
  location: UpdateLocationDto;

  @IsNotEmpty()
  contact: contactDto;

  @IsNotEmpty()
  socialMedia: socialMediaDto;
}
