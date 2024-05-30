import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { UserModule } from '../user/user.module';
import { SocialMediaModule } from '../social-media/social-media.module';
import { LocationEntity } from './entities/location.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationRepository } from './location.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity]), UserModule, SocialMediaModule],
  controllers: [LocationController],
  providers: [LocationService, LocationRepository],
  exports: [LocationService],
})
export class LocationModule {}
