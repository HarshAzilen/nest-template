import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueEntity } from './entities/venue.entity';
import { VenueController } from './venue.controller';
import { VenueRepository } from './venue.repository';
import { VenueService } from './venue.service';
import { UserModule } from '../user/user.module';
import { SocialMediaModule } from '../social-media/social-media.module';

@Module({
  imports: [TypeOrmModule.forFeature([VenueEntity]), forwardRef(() => UserModule), SocialMediaModule],
  controllers: [VenueController],
  providers: [VenueService, VenueRepository],
  exports: [VenueService],
})
export class VenueModule {}
