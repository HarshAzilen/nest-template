import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UpdateLocationDto, contactDto, socialMediaDto } from '../../../modules/location/dto/request-location.dto';

export class CreateVenueDto {}

export class UpdateVenueDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateVenueProfileDto {
  @IsNotEmpty()
  venue: UpdateVenueDto;

  @IsNotEmpty()
  contact: contactDto;

  @IsNotEmpty()
  socialMedia: socialMediaDto;
}
