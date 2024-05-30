import { PartialType } from '@nestjs/swagger';
import { CreateVenueDto } from './request-venue.dto';

export class UpdateVenueDto extends PartialType(CreateVenueDto) {}
