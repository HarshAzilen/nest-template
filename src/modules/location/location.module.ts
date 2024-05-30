import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { UserModule } from '../user/user.module';
import { SocialMediaModule } from '../social-media/social-media.module';

@Module({
  imports: [UserModule, SocialMediaModule],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
