import { PartialType } from '@nestjs/swagger';
import { CreateVenueoperatorDto } from './request-venueoperator.dto';

export class UpdateVenueoperatorDto extends PartialType(CreateVenueoperatorDto) {}
