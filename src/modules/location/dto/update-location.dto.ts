import { PartialType } from '@nestjs/swagger';
import { CreateLocationDto } from './request-location.dto';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {}
