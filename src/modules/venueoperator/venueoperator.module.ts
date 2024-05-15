import { Module } from '@nestjs/common';
import { VenueoperatorService } from './venueoperator.service';
import { VenueoperatorController } from './venueoperator.controller';

@Module({
  controllers: [VenueoperatorController],
  providers: [VenueoperatorService],
})
export class VenueoperatorModule {}
